from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File,Form
from sqlalchemy.orm import Session
from datetime import date

from ..schemas.token import Token
from ..schemas.students import  ShowStudent, StudentUpdate, StudentSIPEmail
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
    
    students= db.query(Student).filter(Student.pref1.professor.dept_id== current_user.id).all()
    data=[]

    for student in students:
        data.append({
            "SIP ID": student.sip_id,
            "Email":student.user.email,
            "Name": student.name,
            "Institution": student.institution,
            "Program": student.program,
            "Student Department": student.department,
            "Year": student.year,
            "Institute Location": student.instituteLocation,
            "Institute State": student.instituteState,
            "Current Semester CGPA": student.currentSemesterCgpa,   
            "UG": student.UG,
            "CGPA 12": student.cgpa12,
            "Board 12": student.board12,    
            "CGPA 10": student.cgpa10,
            "Board 10": student.board10,

            "Project Department": student.pref1.professor.department.name if student.pref1_id else None,

            "Pref 1 Id": student.pref1_id if student.pref1_id else None,
            "Pref 1 Title": student.pref1.title if student.pref1_id else None,
            "Pref 1 Professor": student.pref1.professor.name if student.pref1_id else None,
            "Pref 1 Description": student.pref1.description if student.pref1_id else None,
            "Pref 1 Prerequisites": student.pref1.prerequisites if student.pref1_id else None,
            "Pref 1 Duration": student.pref1.duration if student.pref1_id else None,
            "Pref 1 Mode": student.pref1.mode if student.pref1_id else None,
            "Pref 1 No of Interns": student.pref1.no_of_interns if student.pref1_id else None,
            "Pref 1 Applied Count": student.pref1.applied_count if student.pref1_id else None,
            

            "Pref 2 Id": student.pref2_id  if student.pref2_id else None,
            "Pref 2 Title": student.pref2.title  if student.pref2_id else None,
            "Pref 2 Professor": student.pref2.professor.name if student.pref2_id else None,
            "Pref 2 Description": student.pref2.description if student.pref2_id else None,
            "Pref 2 Prerequisites": student.pref2.prerequisites if student.pref2_id else None,
            "Pref 2 Duration": student.pref2.duration if student.pref2_id else None,
            "Pref 2 Mode": student.pref2.mode if student.pref2_id else None,
            "Pref 2 No of Interns": student.pref2.no_of_interns if student.pref2_id else None,
            "Pref 2 Applied Count": student.pref2.applied_count if student.pref2_id else None,
            
            "Pref 3 Id": student.pref3_id if student.pref3_id else None,
            "Pref 3 Title": student.pref3.title if student.pref3_id else None,
            "Pref 3 Professor": student.pref3.professor.name if student.pref3_id else None,
            "Pref 3 Description": student.pref3.description if student.pref3_id else None,
            "Pref 3 Prerequisites": student.pref3.prerequisites if student.pref3_id else None,
            "Pref 3 Duration": student.pref3.duration if student.pref3_id else None,
            "Pref 3 Mode": student.pref3.mode if student.pref3_id else None,
            "Pref 3 No of Interns": student.pref3.no_of_interns if student.pref3_id else None,
            "Pref 3 Applied Count": student.pref3.applied_count if student.pref3_id else None,
            
        })

    df =pd.DataFrame(data)

    stream=io.StringIO()
    df.to_csv(stream,index=False)
    stream.seek(0)

    return StreamingResponse(stream, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=department_data.csv"})

@router.get("/deptStudents", response_model=list[StudentSIPEmail])
def dept_students(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'department':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a Department User")
    
    students=db.query(Student).filter(Student.pref1_id!=None).filter(Student.pref1.professor.dept_id == current_user.id).all()

    return students

