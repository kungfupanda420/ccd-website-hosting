from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File, Form
from sqlalchemy.orm import Session

from schemas.token import Token
from schemas.admin import DeptDataMessage
from schemas.projects import ProjectStudents
from schemas.rounds import RoundDetails
from models.users import User,Admin, Professor, Department, Student
from models.projects import Project
from models.rounds import Round
from security.JWTtoken import create_access_token
from database import get_db, SessionLocal

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

import glob
from sqlalchemy.orm import joinedload

from celery_worker import celery_app

import os

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr, BaseModel
from asgiref.sync import async_to_sync

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


@celery_app.task(name="fastapi-backend/tasks/confirm_allotments.send_decision_emails")
def send_decision_emails(message:str,id:int):
    db=SessionLocal()
    
    fm = FastMail(conf)

    try:
        department=db.query(Department).filter(Department.user_id==id).first()
        if not department:
            return {"message": "Department not found"}
        
        if(message=='confirmed'):    
            frontend_url=os.getenv('FRONTEND_URL')
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
                try:
                    student.admin_conf=True
                    student.selected_project.vacancy_remaining-=1
                    db.commit()  

                    offer_letter_link = f"{frontend_url}/offer_letter_download"
                    
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

                    async_to_sync(fm.send_message)(message)
                except Exception as e:
                    db.rollback()
                    print(f"Failed to send email to {student.user.email}: {e}")
                    continue
                
            messagedept=MessageSchema(
                subject="NITC Summer Internship Programme",
                recipients=[department.user.email],
                body=f"""
                <h3>Dear Department</h3>
                <p>Your allotments for the Summer Internship Programme have been accepted</p>
                """,
                subtype="html"
            )

            async_to_sync(fm.send_message)(messagedept)

            return {"message":"The student have been allotted their projects and sent emails"}


        elif(message=="rejected"):
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
            async_to_sync(fm.send_message)(message)
            return {"message":"The Project intern allotments have been rejected and departments have been sent emails"}
    finally:
        db.close()            
