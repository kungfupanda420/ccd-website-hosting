from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from schemas.token import Token
from schemas.projects import ShowProject, ProjectCreation
from schemas.students import SetDate
from schemas.professor import ShowProfessorProj, ShowProfessorDet

from models.users import User, Professor, Student, Department
from models.projects import Project
from models.rounds import Round
from security.JWTtoken import create_access_token
from database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from security.oauth2 import get_current_user
from typing import List

router =APIRouter(
    prefix="/api/admin/professor",
    tags=["Admin Professors"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

@router.get('',response_model=List[ShowProfessorDet])
def all_profs(db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view professors")
    
    profs=db.query(Professor).all()
    return profs



@router.post('/{id}/projects',response_model=ShowProject) #Working
def create_project(id:int,request:ProjectCreation,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    
    if(current_user.role != 'admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create project")
    
    prof=db.query(Professor).filter(Professor.user_id==id).first()
    if not prof:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Professor not found")
    
    
    new_project= Project(
        title=request.title,
        description=request.description,
        duration=request.duration,
        mode=request.mode,
        prerequisites=request.prerequisites,
        no_of_interns=request.no_of_interns,
        vacancy_remaining=request.no_of_interns,
        professor_id=id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.get('/{id}/projects',response_model=List[ShowProject]) #Working
def show_projects(id:int,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view projects")
    
    prof=db.query(Professor).filter(Professor.user_id==id).first()
    if not prof:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Professor not found")
    
    projects=db.query(Project).filter(Project.professor_id==id).all()
    return projects

@router.get("/allotted_student/{id}")
def get_alloted_students(id:int,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'admin'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view this ")
    students=(db.query(Student)
              .join(Student.selected_project)
              .filter(Student.admin_conf==True)
              .filter(Student.offer_payment_conf==True)
              .filter(Project.professor_id==id)
              .all())
    return [
        {
            "sip_id":student.sip_id,
            "name":student.name,
            "project_title":student.selected_project.title,
            "start_date":student.start_date,
            "end_date":student.end_date
        }
        for student in students
    ]
