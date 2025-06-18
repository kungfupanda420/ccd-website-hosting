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

frontend_url=os.getenv('FRONTEND_URL')

@celery_app.task(name="fastapi-backend/tasks/next_round.send_round_emails")
def send_round_emails(round_no:int,student_emails,user_emails):
    fm=FastMail(conf)


    if round_no==2:
        
        subject="NITC Summer Internship Programme Round 2"
        body=f"""
                <h3>Dear Student</h3>
                <p>The second round of the project selections have started.</p>
                <p>Please add your preffered projects once again</p>
                <p></p>
                <a href="{frontend_url}">{frontend_url}</a>
                """
        for email in student_emails:
            
            message=MessageSchema(
                subject=subject,
                recipients=[email],
                body=body,
                subtype="html"
            )
            async_to_sync(fm.send_message)(message)
        
    if round_no==3:

        subject_stud="NITC Summer Internship Programme Round 3"
        body_stud=f"""
                <h3>Dear Student</h3>
                <p>The final round of the project selections have started.</p>
                <p>Please add your preffered projects once again</p>
                <p></p>
                <a href="{frontend_url}">{frontend_url}</a>
                """
        
        for email in student_emails:
            

            message=MessageSchema(
                subject=subject_stud,
                recipients=[email],
                body=body_stud,
                subtype="html"
            )
            
            async_to_sync(fm.send_message)(message)

        subject_user="Registrations Open: NITC Summer Internship Programme"
        body_user="""
                <h3>Dear Student</h3>
                <p>The Round of the registrations have started again.</p>
                <p>Please complete your registration and select your preffered projects</p>
                <p></p>
                <a href="{frontend_url}">{frontend_url}</a>
                """
        for email in user_emails:
            
            message=MessageSchema(
                subject=subject_user,
                recipients=[email],
                body=body_user,
                subtype="html"
            )

            async_to_sync(fm.send_message)(message)

    return{"message": f"Emails sent for round {round_no}"}