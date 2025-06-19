from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File, Form, Request
from sqlalchemy.orm import Session

from schemas.token import Token
from schemas.admin import DeptDataMessage
from schemas.projects import ProjectStudents
from schemas.rounds import RoundDetails, InputPassword
from models.users import User,Admin, Professor, Department, Student
from models.projects import Project
from models.rounds import Round
from security.JWTtoken import create_access_token
from database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from security.oauth2 import get_current_user

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

from tasks.make_professor import prof_from_csv

@router.post("/professors") #Working
def make_professor(file: UploadFile= File(...),db: Session=Depends(get_db), current_user: User= Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    csv_content=file.file.read().decode("utf-8")
    prof_from_csv.delay(csv_content)
    return {"status": "processing", "message": "Professor import started in background"}


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

from tasks.professor_pwd_emails import send_prof_emails
@router.post("/send_professor_emails")
def send_professor_emails(db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    professor_data=[]
    professors=db.query(Professor).join(Professor.user).all()

    for professor in professors:
        professor_data.append([professor.user.email,professor.initial_password])
    
    send_prof_emails.delay(professor_data)
    return{"message": f"Emails are being sent to {len(professor_data)} professors"}
    

@router.get("/round_details",response_model=RoundDetails) #Working
def round_details(db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")

    round=db.query(Round).filter(Round.id==1).first()
    if not round:
        raise HTTPException(status_code=404, detail="Round not found")
    return round



from tasks.next_round import send_round_emails
@router.post("/start_next_round", response_model= RoundDetails) # round 1 works, round 2 working, round 3 wokring
def start_next_round(request:InputPassword,db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")


    if not pwd_context.verify(request.password,current_user.password):
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    round=db.query(Round).filter(Round.id==1).first()
    if not round:
        raise HTTPException(status_code=404, detail="Round not found")
    
    if round.number>=3:
        round.lock_choices=1
        round.allow_reg=0
        round.number=0
        db.commit()
        db.refresh(round)
        return round


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
        
        try:
            for student in students:
                student.selected_project = None
            db.commit()
        except:
            db.rollback()
            raise HTTPException(status_code=500, detail="Internal Server Error")

        student_emails=[student.user.email for student in students]
        print(len(student_emails))
        user_emails=[]
        
        if round.number==3:
            users=(db.query(User)
                    .filter(User.role=='Verified Email')
                    .all()
                    )
            user_emails=[user.email for user in users]
        send_round_emails.delay(round.number,student_emails,user_emails)

        students=db.query(Student).all()
        for student in students:
            student.pref1=None
            student.pref2=None
            student.pref3=None
        
        projects=db.query(Project).all()
        for project in projects:
            project.applied_count=0    
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

from tasks.confirm_allotments import send_decision_emails

@router.post("/department_data/{id}") #Working
async def conf_dept_data(id:int,request:DeptDataMessage, db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):

    if(current_user.role != 'admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete project")
    
    department=db.query(Department).filter(Department.user_id==id).first()
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")

    send_decision_emails.delay(request.message,id)

    return {"message": "Emails being sent"}
    




from tasks.generate_id_cards import generate_id_cards 

@router.get("/generate_id_card")
def get_id_card(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    generate_id_cards.delay()

    return {"message": "ID cards are being generated"}
