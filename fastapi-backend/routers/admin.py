from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File
from sqlalchemy.orm import Session

from ..schemas.token import Token
# from ..schemas.admin import 
from ..models.users import User,Admin, Professor, Department
from ..security.JWTtoken import create_access_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user

import pandas as pd
import random
import string

import io
from fastapi.responses import StreamingResponse

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