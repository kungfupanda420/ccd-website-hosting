from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File, Form
from sqlalchemy.orm import Session

from ..schemas.token import Token
# from ..schemas.admin import 
from ..models.users import User,Admin, Professor, Department, Student
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

@router.get("/generate_id_card")
def get_id_card(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    ROOT_DIR= os.path.abspath(os.path.join(os.path.dirname(__file__),"..",".."))
    fileemail=student.user.email.replace("@","at").replace(".","dot")
    
    #
    #
    #
    #
    
    
    filename=f"{fileemail}.png" # fix this to



    PFP_PATH=os.path.join(ROOT_DIR,"uploads","profilePhotos",filename)
    print (ROOT_DIR)
    IDS_DIR = os.path.join(ROOT_DIR, "IDS")

    if not os.path.exists(PFP_PATH):
        raise HTTPException(status_code=404, detail="Profile photo not found")
    TEMPLATE_PATH = os.path.join(ROOT_DIR, "templates", "id_card_template.png")
    FONT_PATH = os.path.join(ROOT_DIR, "templates", "Roboto-Bold.ttf")

    template= Image.open(TEMPLATE_PATH).convert("RGBA")
    draw =ImageDraw.Draw(template)

    font=ImageFont.truetype(FONT_PATH,size=32)


    try :
        student_image=Image.open(PFP_PATH).convert("RGBA")
        student_image=student_image.resize((100,120))
        template.paste(student_image,(50,50))
    except FileNotFoundError:
        print(f"Photo not found ")


    draw.text((500, 260), f"Name: {student.name}", font=font, fill="black")
    draw.text((500, 310), f"SIP ID: {student.sip_id}", font=font, fill="black")

    output_pdf=template.convert("RGB")
    
    output = io.BytesIO()
    output_pdf.save(output, format="PDF")
    output.seek(0)
    
    return StreamingResponse(output, media_type="application/pdf", headers={
        "Content-Disposition": f"inline; filename={student.sip_id}_id_card.pdf"
    })
