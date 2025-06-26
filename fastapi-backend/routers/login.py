from fastapi import APIRouter, Depends, HTTPException, status, Response, Request
from sqlalchemy.orm import Session
from fastapi.responses import RedirectResponse
from schemas.token import Token
from schemas.login import UserLogin, ForgotPasswordRequest, ChangePasswordRequest
from models.users import User, Student
from security.JWTtoken import create_access_token, create_refresh_token, verify_access_token
from database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from security.oauth2 import get_current_user

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr, BaseModel
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
import os
from dotenv import load_dotenv

from datetime import timedelta


from urllib.parse import urlencode

import random
import string


router =APIRouter(
    prefix="/api",
    tags=["Login"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

load_dotenv()


GOOGLE_CLIENT_ID=os.getenv('GOOGLE_CLIENT_ID')

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

@router.post("/auth/google/login")
async def google_login(request: Request, db: Session = Depends(get_db)):
    data = await request.json()
    token = data.get("token")
    if not token:
        raise HTTPException(status_code=400, detail="No token provided")

    try:
        idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), GOOGLE_CLIENT_ID)
        email = idinfo["email"]
    except Exception as e:
        print("Google token verification failed:", e)
        raise HTTPException(status_code=401, detail="Invalid Google token")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        password =''.join(random.choices(string.ascii_letters + string.digits, k=6))    
        user = User(
            email=email,
            password=pwd_context.hash(password),
            role="Verified Email"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token(data={"sub": user.email})
    refresh_token = create_refresh_token(data={"sub": user.email})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "role": user.role,
        "email": user.email
    }

@router.post('/login')  #Working
def login(request: UserLogin, db: Session=Depends(get_db)):
    user = db.query(User).filter(User.email== request.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="User not Found")
    if not pwd_context.verify(request.password,user.password):
        raise HTTPException(status_code=401, detail="Invalid Credentials")
    
    access_token= create_access_token(
        data={"sub":user.email}
    )
    refresh_token= create_refresh_token(
        data={"sub":user.email}
    )
    print(access_token)
    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        id=user.id,
        email=user.email,
        role=user.role
    )



@router.post('/forgot_password') #Working
async def forgot_password(request: ForgotPasswordRequest ,db:Session=Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        return {"msg": "If this email exists, a reset link will be sent."}
    
    reset_token= create_access_token(
        data={"sub":request.email},
        expires_delta=timedelta(minutes=30)
    )
    frontend_url=os.getenv('FRONTEND_URL')
    reset_link = f"{frontend_url}/reset_password?token={reset_token}"

    message=MessageSchema(
        subject="Chage password on NITC SIP Portal",
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


@router.post('/change_password') #Working
async def change_password(request: ChangePasswordRequest,db:Session=Depends(get_db)):

    try:
        payload=verify_access_token(request.token)
        email=payload.get("sub")

        if email is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    
    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.password = pwd_context.hash(request.password)
    db.commit() 
    db.refresh(user)    
    return {"msg": "Password changed successfully"}

# Tested all working

