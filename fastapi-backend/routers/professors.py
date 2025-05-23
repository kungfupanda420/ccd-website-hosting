from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from ..schemas.token import Token
from ..schemas.projects import ShowProject, ProjectCreation
from ..models.users import User, Professor
from ..models.projects import Project
from ..security.JWTtoken import create_access_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user

router =APIRouter(
    prefix="/api/professors",
    tags=["Professors"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

@router.post('/makeProject',response_model=ShowProject)
def create_project(request:ProjectCreation,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create project")
    
    new_project= Project(
        title=request.title,
        description=request.description,
        no_of_interns=request.no_of_interns,
        duration=request.duration,
        mode=request.mode,
        prerequisites=request.prerequisites,
        professor_id=current_user.id
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project

@router.get('/myProjects',response_model=list[ShowProject])
def show_projects(db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view projects")
    
    projects=db.query(Project).filter(Project.professor_id==current_user.id).all()
    return projects

@router.put("editProject/{id}",response_model=ShowProject)
def edit_project(id:int,request:ProjectCreation,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to edit project")
    
    project=db.query(Project).filter(Project.id==id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    if not project.professor_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to edit project")
    
    project.title=request.title
    project.description=request.description
    project.no_of_interns=request.no_of_interns
    project.duration=request.duration
    project.mode=request.mode
    project.prerequisites=request.prerequisites

    db.commit()
    db.refresh(project)
    return project

@router.delete('/deleteProject/{id}',status_code=status.HTTP_204_NO_CONTENT)
def delete_project(id:int,db:Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if(current_user.role != 'professor'):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete project")
    
    project=db.query(Project).filter(Project.id==id).first()
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")
    if not project.professor_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete project")
    db.delete(project)
    db.commit()
    return