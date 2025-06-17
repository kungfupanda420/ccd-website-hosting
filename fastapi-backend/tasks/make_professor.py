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

import pandas as pd
import random
import string
import io

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
from celery_worker import celery_app

@celery_app.task(name="fastapi-backend/tasks/make_professor.prof_from_csv")
def prof_from_csv(csv_content:str):
    db=SessionLocal()
    
    try:
        df=pd.read_csv(io.StringIO(csv_content))

        required_cols={'Email','Name','Department'}
        if not required_cols.issubset(df.columns):
            return {"status": "error", "message": "Invalid file format. Required columns: Email, Name, Department"}

        for _, row in df.iterrows():   #df.iterrows() yields pairs of (index, row) for each row in the DataFrame. If you don’t need the index, you use _ to indicate “I’m ignoring this value.”
            email= row['Email']
            name= row['Name']
            department= row['Department']

            if db.query(User).filter(User.email==email).first():
                continue

            dept= db.query(Department).filter(Department.name==department).first()

            if not dept:
                continue

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
    except Exception as e:
        db.rollback()
        # Log the exception (optional)
        return {"status": "error", "message": str(e)}

    finally:
        db.close()