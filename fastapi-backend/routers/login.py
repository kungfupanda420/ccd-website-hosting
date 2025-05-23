from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from ..schemas.token import Token
from ..schemas.login import UserLogin, ForgotPasswordRequest, ChangePasswordRequest
from ..models.users import User, Student
from ..security.JWTtoken import create_access_token, create_refresh_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr, BaseModel

import os
from dotenv import load_dotenv

from datetime import timedelta

router =APIRouter(
    prefix="/api",
    tags=["Login"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

load_dotenv()

@router.post('/login')
def login(request: UserLogin, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.email== request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    if not pwd_context.verify(request.password,user.password):
        raise HTTPException(status_code=404, detail="Invalid Credentials")
    
    access_token= create_access_token(
        data={"sub":user.email}
    )
    refresh_token= create_refresh_token(
        data={"sub":user.email}
    )
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        id=user.id,
        email=user.email,
        role=user.role
    )

conf = ConnectionConfig(
    MAIL_USERNAME='thomassjamess420@gmail.com',
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_FROM='thomassjamess420@gmail.com',
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS= False,
    USE_CREDENTIALS=True
)

@router.post('/forgotPassword')
async def forgot_password(request: ForgotPasswordRequest ,db:Session=Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        return {"msg": "If this email exists, a reset link will be sent."}
    
    reset_token= create_access_token(
        data={"sub":request.email},
        expires_delta=timedelta(minutes=30)
    )

    reset_link = f"http://localhost:3000/reset_password?token={reset_token}"

    message=MessageSchema(
        subject="This is a test email",
        recipients=[request.email],
        body=f"""
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="{reset_link}">{reset_link}</a>
        <p>If you didn't request this, you can ignore this email.</p>
        """,
        subtype="html"
    )
    fm=FastMail(conf)

    await fm.send_message(message)
    return {"msg": f"Password Reset email sent to {request.email}"}


@router.post('/changePassword')