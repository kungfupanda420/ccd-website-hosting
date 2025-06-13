from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File, Form, Request
from sqlalchemy.orm import Session

from ..schemas.token import Token
from ..schemas.admin import DeptDataMessage
from ..schemas.projects import ProjectStudents
from ..schemas.rounds import RoundDetails, InputPassword
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

            
@router.post("/professors") #Working
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


@router.get('/professors') #Working
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


@router.get("/round_details",response_model=RoundDetails)
def round_details(db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    round=db.query(Round).filter(Round.id==1).first()
    if not round:
        raise HTTPException(status_code=404, detail="Round not found")
    return round


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

        subject_stud="NITC Summer Internship Programme Round 3"
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

        subject_user="Registrations Open: NITC Summer Internship Programme"
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

@router.post("/start_next_round", response_model= RoundDetails) # round 1 works, round 2 working,
async def start_next_round(request:InputPassword,db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")


    if not pwd_context.verify(request.password,current_user.password):
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    round=db.query(Round).filter(Round.id==1).first()
    if not round:
        raise HTTPException(status_code=404, detail="Round not found")
    
    if round.number>=3:
        raise HTTPException(status_code=403, detail="Cannot Proceed. Final Round has been completed")

    round.number+=1
    round.lock_choices=0

    if round.number!=2:
        round.allow_reg=1

    db.commit()
    db.refresh(round)
    print("HI")
    if round.number ==2 or round.number==3 :

        students=(db.query(Student)
                    .join(Student.user)
                    .filter(Student.admin_conf==False) # change this function for now
                    .all()
                    )
        
        for student in students:
            student.selected_project = None
        student_emails=[student.user.email for student in students]
        print(len(student_emails))
        user_emails=[]
        
        if round.number==3:
            users=(db.query(User)
                    .filter(User.role=='Verified Email')
                    .all()
                    )
            user_emails=[user.email for user in users]
        asyncio.create_task(send_round_emails(round.number,student_emails,user_emails))

        
        students=db.query(Student).all()
        for student in students:
            student.pref1=None
            student.pref2=None
            student.pref3=None
            
        db.commit()

    return round

@router.post("/stop_registrations",response_model=RoundDetails) # Working
def stop_registrations(request:InputPassword, db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    if not pwd_context.verify(request.password,current_user.password):
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    
    round=db.query(Round).filter(Round.id==1).first()
    if not round:
        raise HTTPException(status_code=404, detail="Round not found")
    
    round.allow_reg=0
    db.commit()
    db.refresh(round)
    return round

@router.post("/lock_choices",response_model=RoundDetails) # Working
def lock_choices(request:InputPassword,db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    if not pwd_context.verify(request.password,current_user.password):
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    round=db.query(Round).filter(Round.id==1).first()
    if not round:
        raise HTTPException(status_code=404, detail="Round not found")
    
    round.lock_choices=1
    db.commit()
    db.refresh(round)
    return round


@router.get("/departments", response_model=List[dict])  #Working
def get_departments(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to access this resource")
    
    departments = db.query(Department).all()

    if not departments:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No departments found")

    return [{"id": department.user_id, "name": department.name} for department in departments]


@router.get("/department_data/{id}",response_model=List[ProjectStudents]) #Add on admin conf in frontend
def dept_data(id:int, db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):

    if(current_user.role != 'admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized")
    
    projects=db.query(Project).join(Project.professor).join(Professor.department).filter(Department.user_id==id).all()


    return projects



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
                          .filter(Student.admin_conf==False)
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
    




from ..tasks.generate_id_cards import generate_id_cards 

@router.get("/generate_id_card")
def get_id_card(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")

    generate_id_cards.delay()

    return {"message": "ID cards generated successfully"}
