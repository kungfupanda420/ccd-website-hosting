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

router =APIRouter(
    prefix="/api/admin",
    tags=["Admin"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

@router.post("/makeProfessor")
def make_professor(file: UploadFile= File(...), db: Session=Depends(get_db), current_user: User= Depends(get_current_user)):
    print("Current user:", current_user.email, "Role:", current_user.role)
    if current_user.role != 'admin':
        print("Not an admin!")
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not an Admin")
    try:
        df = pd.read_excel(file.file)
        print("Excel columns:", df.columns)
    except Exception as e:
        print("Error reading Excel:", e)
        raise
    required_cols = {'Email', 'Name', 'Department'}
    if not required_cols.issubset(df.columns):
        print("Missing columns!")
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file format. Required columns: Email, Name, Department")
    # ...rest of your code...
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
            dept_id=dept.user_id
        )
        db.add(new_professor)

    db.commit()

    return {"status":"success", "message":"Professors added successfully"}

