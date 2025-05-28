from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File,Form
from sqlalchemy.orm import Session
from datetime import date

from ..schemas.token import Token
from ..schemas.students import  ShowStudent, StudentUpdate
from ..schemas.projects import ShowProject, ProjectPreferences
from ..models.users import User, Student, Professor, Department
from ..models.projects import Project
from ..security.JWTtoken import create_access_token, create_refresh_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user

import pandas as pd
import io
from fastapi.responses import StreamingResponse

router =APIRouter(
    prefix="/api/departments",
    tags=["Departments"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

@router.get("/departmentData")
def deptdata(db: Session=Depends(get_db),current_user: User= Depends(get_current_user)):
    
    if current_user.role !='department':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a Department User")
    
    department = db.query(User).filter(User.id == current_user.id).first().department
    if not department:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Department not found")
    
    students= db.query(Student).filter(Student.pref1.professor.dept_id== current_user.id |
                                       Student.pref2.professor.dept_id== current_user.id |
                                       Student.pref3.professor.dept_id== current_user.id 
                                       ).all()
    data=[]

    for student in students:
        data.append({
            "Name":student.user.email,
            
        })
