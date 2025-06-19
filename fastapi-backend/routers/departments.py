from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File,Form
from sqlalchemy.orm import Session
from datetime import date

from schemas.token import Token
from schemas.students import  ShowStudent, StudentUpdate, StudentSIPNameProj
from schemas.projects import ShowProject, ProjectPreferences
from models.users import User, Student, Professor, Department
from models.projects import Project
from models.rounds import Round
from security.JWTtoken import create_access_token, create_refresh_token
from database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from security.oauth2 import get_current_user

import pandas as pd
import io
from fastapi.responses import StreamingResponse
from typing import List

router =APIRouter(
    prefix="/api/departments",
    tags=["Departments"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db
@router.get("/department_data")  #Working
def deptdata(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'department':
        raise HTTPException(status_code=403, detail="Not a Department User")
    
    # Get department first to verify existence
    department = db.query(User).filter(User.id == current_user.id).first().department
    if not department:
        raise HTTPException(status_code=404, detail="Department not found")
    
    round=db.query(Round).filter(Round.id==1).first()
    if(round.lock_choices==0):
        raise HTTPException(status_code=403, detail="Cannot get data as choices have not been locked")
    updated_projects = []

    # Corrected query with explicit joins
    students = (
        db.query(Student)
        .join(Student.pref1)  # Join to Project (pref1)
        .join(Project.professor)  # Join to Professor
        .filter(Professor.dept_id == current_user.id).
        filter(Student.admin_conf==False)
        .all()
    )

    data = []
    for student in students:
        # Safely access relationships with None checks
        pref1 = student.pref1
        pref2 = student.pref2
        pref3 = student.pref3

        data.append({
            "SIP ID": student.sip_id,
            "Apaar ID": student.apaar_id,
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
            
            # Safe access to project preferences
            "Project Department": pref1.professor.department.name if pref1 and pref1.professor else None,
            
            "Pref 1 Id": pref1.id if pref1 else None,
            "Pref 1 Title": pref1.title if pref1 else None,
            "Pref 1 Professor": pref1.professor.name if pref1 and pref1.professor else None,
            
            "Pref 2 Id": pref2.id if pref2 else None,
            "Pref 2 Title": pref2.title if pref2 else None,
            "Pref 2 Professor": pref2.professor.name if pref2 and pref2.professor else None,
            
            "Pref 3 Id": pref3.id if pref3 else None,
            "Pref 3 Title": pref3.title if pref3 else None,
            "Pref 3 Professor": pref3.professor.name if pref3 and pref3.professor else None,
        })

    # Generate CSV
    df = pd.DataFrame(data)
    stream = io.StringIO()
    df.to_csv(stream, index=False)
    stream.seek(0)

    return StreamingResponse(
        stream,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=department_data.csv"}
    )

@router.get("/unalloted_studentwise_data", response_model=List[StudentSIPNameProj]) #Working
def dept_students(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'department':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a Department User")
    
    students = (
        db.query(Student)
        .join(Student.pref1)  # Join to Project (pref1)
        .join(Project.professor)  # Join to Professor
        .filter(Professor.dept_id == current_user.id)
        .filter(Student.admin_conf==False)
        .all()
    )

    return students


@router.get("/alloted_studentwise_data", response_model=List[StudentSIPNameProj]) 
def dept_students(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'department':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a Department User")
    
    students = (
        db.query(Student)
        .join(Student.selected_project)  # Join to Project (pref1)
        .join(Project.professor)  # Join to Professor
        .filter(Professor.dept_id == current_user.id)
        .filter(Student.admin_conf==True)
        .all()
    )

    return students

@router.post("/allotment/{sip_id}/{project_id}") #Working
def allot_student(sip_id:str, project_id:int, db:Session=Depends(get_db), current_user: User=Depends(get_current_user)):
    if current_user.role != 'department':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a Department User")
    
    round=db.query(Round).filter(Round.id==1).first()
    if(round.lock_choices==0):
        raise HTTPException(status_code=403, detail="Cannot allot students as choices have not been locked")
    updated_projects = []
    
    student = db.query(Student).filter(Student.sip_id == sip_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    
    if student.admin_conf == True:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Student has already been approved by admin")
    
    project = db.query(Project).filter(Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    if project not in (student.pref1, student.pref2, student.pref3):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Project not in student's preferences")
    

    student.selected_project= project

    db.commit()
    db.refresh(student)
    return {"message": "Student alloted to project successfully", "student": student, "project": project}

@router.delete("/allotment/{sip_id}") #Working
def unallot_student(sip_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'department':
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a Department User")
    
    student = db.query(Student).filter(Student.sip_id == sip_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    
    round=db.query(Round).filter(Round.id==1).first()
    if(round.lock_choices==0):
        raise HTTPException(status_code=403, detail="Cannot deallot students as choices have not been locked")
    
    if student.selected_project_id is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Student has not been alloted any project")
    
    if student.admin_conf == True:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Student has already been approved by admin")
    
    student.selected_project = None
    db.commit()
    db.refresh(student)
    
    return {"message": "Student unalloted from project successfully", "student": student}