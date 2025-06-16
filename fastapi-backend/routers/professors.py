from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from ..schemas.token import Token
from ..schemas.projects import ShowProject, ProjectCreation
from ..schemas.students import SetDate
from ..models.users import User, Professor, Student, Department
from ..models.projects import Project
from ..models.rounds import Round
from ..security.JWTtoken import create_access_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user
from typing import List

router =APIRouter(
    prefix="/api/professors",
    tags=["Professors"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

@router.post('/projects',response_model=ShowProject) #Working
def create_project(request:ProjectCreation,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create project")
    
    round=db.query(Round).filter(Round.id==1).first()
    if round.number!=0:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot create a project once allotment starts")
    
    new_project= Project(
        title=request.title,
        description=request.description,
        duration=request.duration,
        mode=request.mode,
        prerequisites=request.prerequisites,
        no_of_interns=request.no_of_interns,
        vacancy_remaining=request.no_of_interns,
        professor_id=current_user.id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.get('/projects',response_model=List[ShowProject]) #Working
def show_projects(db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view projects")
    
    projects=db.query(Project).filter(Project.professor_id==current_user.id).all()
    return projects

@router.put("/projects/{id}",response_model=ShowProject) #Working
def edit_project(id:int,request:ProjectCreation,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    
    
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to edit project")
    
    round=db.query(Round).filter(Round.id==1).first()
    if round.number!=0:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot modify a project once allotment starts")
    
    project=db.query(Project).filter(Project.id==id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    if not project.professor_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to edit project")
    
    project.title=request.title
    project.description=request.description
    project.duration=request.duration
    project.mode=request.mode
    project.prerequisites=request.prerequisites

    project.no_of_interns=request.no_of_interns
    project.vacancy_remaining=request.no_of_interns

    db.commit()
    db.refresh(project)
    return project

@router.delete('/project/{id}',status_code=status.HTTP_204_NO_CONTENT) #Working
def delete_project(id:int,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete project")
    
    round=db.query(Round).filter(Round.id==1).first()
    if round.number!=0:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot delete a project once allotment starts")
    
    project=db.query(Project).filter(Project.id==id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    if not project.professor_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete project")
    db.delete(project)
    db.commit()
    return



@router.post('/set_start_date/{sip_id}')
def set_start_date(sip_id:str, request:SetDate, db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete project")
    
    student=db.query(Student).filter(Student.sip_id==sip_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found")
    
    if not student.selected_project or student.selected_project.professor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to update this student's internship dates."
        )
    
    student.start_date=request.date
    db.commit()
    db.refresh(student)
    return {"message": f"Student has started internship on {student.start_date}"}


@router.post('/set_end_date/{sip_id}')
def set_end_date(sip_id:str, request:SetDate, db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete project")
    
    student=db.query(Student).filter(Student.sip_id==sip_id).first()
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    
    if not student.selected_project or student.selected_project.professor_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to update this student's internship dates."
        )

    student.end_date=request.date
    db.commit()
    db.refresh(student)
    return {"message": f"Student has ended internship on {student.end_date}"}