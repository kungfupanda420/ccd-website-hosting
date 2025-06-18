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

frontend_url= os.getenv('FRONTEND_URL')
if not frontend_url:
    raise ValueError("FRONTEND_URL environment variable is not set")

@celery_app.task(name="fastapi-backend/tasks/professor_pwd_emails.send_prof_emails")
def send_prof_emails(professor_data):
    fm=FastMail(conf)

    subject="Summer Internship Portal Login"
    body_template="""
                <h3>Dear Professor</h3>
                <p>Attached below are your email and password</p>
                <p>Email:{email}</p>
                <p>Pasword:{password}</p>
                <p>Please login to the website using this email at</p>
                <a href="{site_url}/login">{site_url}/login</a>
                """
    
    for email,password in professor_data:
        body=body_template.format(email=email,password=password,site_url=frontend_url)
        
        message=MessageSchema(
            subject=subject,
            recipients=[email],
            body=body,
            subtype="html"
        )
        try:
            async_to_sync(fm.send_message)(message)
        except Exception as e:
            print(f"Failed to send email to {email}: {str(e)}")

    return{"message": f"Emails sent to {len(professor_data)} professors"}

