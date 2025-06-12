from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File, Form
from sqlalchemy.orm import Session

from ..schemas.token import Token
from ..schemas.admin import DeptDataMessage
from ..schemas.projects import ProjectStudents
from ..schemas.rounds import RoundDetails
from ..models.users import User,Admin, Professor, Department, Student
from ..models.projects import Project
from ..models.rounds import Round
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

from typing import List
router =APIRouter(
    prefix="/api/admin",
    tags=["Admin"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

import os

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr, BaseModel


from dotenv import load_dotenv
load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME='sip@nitc.ac.in',
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_FROM='sip@nitc.ac.in',
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS= False,
    USE_CREDENTIALS=True
)

import asyncio

async def send_round_emails(round_no:int, student_emails, user_emails):

    fm=FastMail(conf)


    if round_no==2:
        
        subject="NITC Summer Internship Programme Round 2"
        body="""
                <h3>Dear Student</h3>
                <p>The second round of the project selections have started.</p>
                <p>Please add your preffered projects once again</p>
                <p></p>
                <a href="https://placement.nitc.ac.in">placement.nitc.ac.in</a>
                """
        for email in student_emails:
            
            message=MessageSchema(
                subject=subject,
                recipients=[email],
                body=body,
                subtype="html"
            )
            await fm.send_message(message)
        
    if round_no==3:

        subject_stud="NITC Summer Internship Programme Round 2"
        body_stud="""
                <h3>Dear Student</h3>
                <p>The final round of the project selections have started.</p>
                <p>Please add your preffered projects once again</p>
                <p></p>
                <a href="https://placement.nitc.ac.in">placement.nitc.ac.in</a>
                """
        
        for email in student_emails:
            

            message=MessageSchema(
                subject=subject_stud,
                recipients=[email],
                body=body_stud,
                subtype="html"
            )
            
            await fm.send_message(message)

        subject_user="NITC Summer Internship Programme Round 2"
        body_user="""
                <h3>Dear Student</h3>
                <p>The Round of the registrations have started again.</p>
                <p>Please complete your registration and select your preffered projects</p>
                <p></p>
                <a href="https://placement.nitc.ac.in">placement.nitc.ac.in</a>
                """
        for email in user_emails:
            
            message=MessageSchema(
                subject=subject_user,
                recipients=[email],
                body=body_user,
                subtype="html"
            )

            await fm.send_message(message)
            


@router.post("/start_next_round", response_model= RoundDetails)
async def start_next_round(db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    round=db.query(Round).filter(Round.id==1).first()
    if not round:
        raise HTTPException(status_code=404, detail="Round not found")
    
    if round.number>=3:
        raise HTTPException(status_code=403, detail="Final Round has been completed")

    round.number+=1
    round.allow_reg=1

    db.commit()
    db.refresh(round)

    if round.number in [2,3]:

        students=(db.query(Student)
                    .join(Student.user)
                    .filter(Student.admin_conf==None)
                    .all()
                    )
        student_emails=[student.user.email for student in students]
        user_emails=[]
        
        if round.number==3:
            users=(db.query(User)
                    .filter(User.role=='student')
                    .filter(User.student==None)
                    .all()
                    )
            user_emails=[user.email for user in users]
        asyncio.create_task(send_round_emails(round.number,student_emails,user_emails))
       

    return round

@router.post("/stop_registrations",response_model=RoundDetails)
def stop_registrations(db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    round=db.query(Round).filter(Round.id==1).first()
    if not round:
        raise HTTPException(status_code=404, detail="Round not found")
    
    round.allow_reg=0
    db.commit()
    db.refresh(round)
    return round

@router.post("/professors")
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


@router.get('/professors')
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
        .filter(Student.admin_conf==True)
        .filter(Student.offer_payment_conf==True)
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

    return {"message": "ID cards generated successfully"}


@router.get("/department_data/{id}",response_model=List[ProjectStudents])
def dept_data(id:int, db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):

    if(current_user.role != 'admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    projects=db.query(Project).join(Project.professor).join(Professor.department).filter(Department.user_id==id).all()

    ret_projects=[]
    for project in projects:
        students=[s for s in project.selected_students if not s.admin_conf]

        if students:
            project.selected_students=students
            ret_projects.append(project)

    return ret_projects



@router.post("/department_data/{id}")
async def conf_dept_data(id:int,request:DeptDataMessage, db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):

    if(current_user.role != 'admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete project")
    
    department=db.query(Department).filter(Department.user_id==id).first()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")

    if(request.message=='confirmed'):    
        
        students=(db.query(Student)
                          .join(Student.selected_project)
                          .join(Project.professor)
                          .join(Professor.department)
                          .filter(Student.selected_project_id.isnot(None))
                          .filter(Department.user_id==id)
                          .all()
                          )
        for student in students:
            
            student.admin_conf=True
            student.selected_project.vacancy_remaining-=1

            offer_letter_link = f"http://localhost:3000/offer_letter_download"
            
            message=MessageSchema(
                subject="NITC Summer Internship Programme selection",
                recipients=[student.user.email],
                body=f"""
                <h3>Dear Student</h3>
                <p>You have been selected for the internship under {student.selected_project.professor.name} for the project {student.selected_project.title} </p>
                <p>You may contact your professor regarding the date of joining at {student.selected_project.professor.user.email}</p>
                <p>You may download your offer letter at the given link after completing the payment</p>
                <a href="{offer_letter_link}">{offer_letter_link}</a>
                """,
                subtype="html"
            )

            db.commit()
            db.refresh(student)
            fm=FastMail(conf)
            await fm.send_message(message)
            
        messagedept=MessageSchema(
            subject="NITC Summer Internship Programme",
            recipients=[department.user.email],
            body=f"""
            <h3>Dear Department</h3>
            <p>Your allotments for the Summer Internship Programme have been acceptd</p>
            """,
            subtype="html"
        )

        fm=FastMail(conf)
        await fm.send_message(messagedept)

        return {"message":"The student have been alloted their projects and sent emails"}


    elif(request.message=="rejected"):
        message=MessageSchema(
            subject="NITC Summer Internship Programme",
            recipients=[department.user.email],
            body=f"""
            <h3>Dear Department</h3>
            <p>Your allotments for the Summer Internship Programme have been rejected</p>
            <p>Please update them again</p>
            """,
            subtype="html"
        )
        fm=FastMail(conf)
        await fm.send_message(message)
        return {"message":"The Project intern allotments have been rejected and departments have been sent emails"}
    
    else:
        raise HTTPException(status_code=400, detail="Invalid message value")
    



@router.get("/departments", response_model=List[dict])
def get_departments(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this resource")
    
    departments = db.query(Department).all()

    if not departments:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No departments found")

    return [{"id": department.user_id, "name": department.name} for department in departments]