from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File, Form
from sqlalchemy.orm import Session

from ..schemas.token import Token
# from ..schemas.admin import 
from ..models.users import User,Admin, Professor, Department, Student
from ..models.projects import Project
from ..security.JWTtoken import create_access_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user

import pandas as pd
import random
import string


from fastapi.responses import StreamingResponse
from PIL import Image, ImageDraw, ImageFont
import io
import os

router =APIRouter(
    prefix="/api/admin",
    tags=["Admin"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

@router.post("/makeProfessor")
def make_professor(file: UploadFile= File(...),db: Session=Depends(get_db), current_user: User= Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    df = pd.read_csv(file.file)
    required_cols={'Email','Name','Department'}

    if not required_cols.issubset(df.columns):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file format. Required columns: Email, Name, Department")

    for _, row in df.iterrows():   #df.iterrows() yields pairs of (index, row) for each row in the DataFrame. If you don’t need the index, you use _ to indicate “I’m ignoring this value.”
        email= row['Email']
        name= row['Name']
        department= row['Department']

        if db.query(User).filter(User.email==email).first():
            continue

        dept= db.query(Department).filter(Department.name==department).first()

        if not dept:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Department {department} not found")
        
        password=''.join(random.choices(string.ascii_letters+string.digits,k=8))
        hashed_password=pwd_context.hash(password)

        new_user=User(
            email=email,
            password=hashed_password,
            role='professor'
        )
        db.add(new_user)
        db.flush()

        new_professor=Professor(
            name=name,
            user_id=new_user.id,
            dept_id=dept.user_id,
            initial_password=password,
        )
        db.add(new_professor)

    db.commit()

    return {"status":"success", "message":"Professors added successfully"}


@router.get('/exportProfessors')
def export_professors(db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")
    
    professors = db.query(Professor).join(Professor.user).join(Professor.department).all()


    data=[]

    for prof in professors:
        data.append({
            "Name": prof.name,
            "Email": prof.user.email,
            "Department": prof.department.name,
            "Password": prof.initial_password
        })
    
    df =pd.DataFrame(data)

    stream= io.StringIO()
    df.to_csv(stream,index=False)
    stream.seek(0)

    return StreamingResponse( stream, media_type='text/csv', headers={"Content-Disposition": "attachment; filename=professors.csv"})

import glob
from sqlalchemy.orm import joinedload

@router.get("/generate_id_card")
def get_id_card(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")


    ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    IDS_DIR = os.path.join(ROOT_DIR, "IDS")
    TEMPLATE_PATH = os.path.join(ROOT_DIR, "templates", "id_card_template.png")
    FONT_PATH = os.path.join(ROOT_DIR, "templates", "SemiBold20.otf")

    original_template = Image.open(TEMPLATE_PATH).convert("RGBA")
    font = ImageFont.truetype(FONT_PATH, size=45)

    # Paste profile photo
    colour_code = "#3f0eaf"
    def round_corners(image, radius):
    # Create rounded mask
        rounded_mask = Image.new("L", image.size, 0)
        draw = ImageDraw.Draw(rounded_mask)
        draw.rounded_rectangle([0, 0, image.size[0], image.size[1]], radius=radius, fill=255)

        # Apply mask to the image alpha channel
        rounded_image = image.copy()
        rounded_image.putalpha(rounded_mask)
        return rounded_image
    def draw_wrapped_text(draw, text, position, font, max_width, line_height):
        words = text.split()
        lines = []
        current_line = ""

        for word in words:
            test_line = f"{current_line} {word}".strip()
            bbox = font.getbbox(test_line)
            width = bbox[2] - bbox[0]  # x1 - x0
            if width <= max_width:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        if current_line:
            lines.append(current_line)

        x, y = position
        for line in lines:
            draw.text((x, y), line, font=font, fill=colour_code)
            y += line_height
        return y
    
    students=(
        db.query(Student)
        .join(Student.user)
        .join(Student.selected_project)
        .join(Project.professor)
        .join(Professor.department)
        .filter(Student.selected_project_id!=None)
        .options(
            joinedload(Student.selected_project)
            .joinedload(Project.professor)
            .joinedload(Professor.department),
            joinedload(Student.user)

        ).all()
    )
    
    for student in students:
        
        template=original_template.copy()
        draw = ImageDraw.Draw(template)

        email=student.user.email
        fileemail = email.replace("@", "at").replace(".", "dot")
        Profile_PATH = os.path.join(ROOT_DIR, "uploads", "profilePhotos")
        matching_files = glob.glob(os.path.join(Profile_PATH, f"{fileemail}.*"))

        if not matching_files:
            raise HTTPException(status_code=404, detail="Profile photo not found")
        PFP_PATH = matching_files[0]

        try:
            student_image = Image.open(PFP_PATH).convert("RGBA")
            student_image = student_image.resize((500, 600))
            student_image = round_corners(student_image, radius=15)

            template.paste(student_image, (150, 350),student_image)
        except FileNotFoundError:
            print("Photo not found")

        # Utility to wrap text
        
        professor=db.query(Student).join(Student.user).filter(Student.selected_project_id!=None).all()


        max_text_width = 500
        line_height = 40
        start_y = 1060

        # Line 1: Name wrapped
        start_y = draw_wrapped_text(draw,student.name, (340, 1057), font, max_text_width, line_height)
        start_y += 10

        # Line 2: Mobile number
        draw.text((340, 1205),student.sip_id, font=font, fill=colour_code)
        start_y += 50

        # Line 3: Name again, wrapped
        start_y = draw_wrapped_text(draw, student.phone, (340, 1282), font, max_text_width, line_height)
        start_y += 10

        # Line 4: Name again, wrapped
        start_y = draw_wrapped_text(draw, student.selected_project.professor.name, (340, 1346), font, max_text_width, line_height)
        start_y += 10

        start_y = draw_wrapped_text(draw, student.selected_project.professor.department.name, (340, 1456), font, max_text_width, line_height)
        start_y += 10

        # Line 5: Date
        draw.text((340, 1626), "10 July 2025", font=font, fill=colour_code)

        # Save the ID card
        output_pdf = template.convert("RGB")
        os.makedirs(IDS_DIR, exist_ok=True)
        save_path = os.path.join(IDS_DIR, f"{student.sip_id}_id_card.pdf")
        output_pdf.save(save_path, format="PDF")

    return {"message": f"ID cards generated successfully"}