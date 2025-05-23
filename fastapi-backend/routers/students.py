from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from ..schemas.token import Token
from ..schemas.students import StudentRegister, ShowStudent, StudentUpdate
from ..schemas.projects import ShowProject
from ..models.users import User, Student
from ..models.projects import Project
from ..security.JWTtoken import create_access_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user

router =APIRouter(
    prefix="/api/students",
    tags=["Students"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

@router.post("/register",response_model=Token)
def register(request:StudentRegister,db:Session=Depends(get_db)):
    
    user=db.query(User).filter(User.email==request.email).first()
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed_password = pwd_context.hash(request.password)
    new_user=       new_user = User(
            
            email=request.email,
            password=hashed_password,
            role='student'
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    new_student = Student(
        user_id=new_user.id,
        name=request.name,
        phone=request.phone,
        dob=request.dob,
        address=request.address,
        state=request.state,
        guardianName=request.guardianName,
        guardianRelation=request.guardianRelation,
        guardianPhone=request.guardianPhone,
        institution=request.institution,
        program=request.program,
        department=request.department,
        year=request.year,
        instituteLocation=request.instituteLocation,
        instituteState=request.instituteState,
        currentSemesterCgpa=request.currentSemesterCgpa,
        UG=request.UG,
        cgpa12=request.cgpa12,
        board12=request.board12,
        cgpa10=request.cgpa10,
        board10=request.board10,
        regPayment=request.regPayment,
        # add other fields if needed
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    
    access_token=create_access_token(
        data={"sub":new_user.email}
    )

    return Token(access_token=access_token, token_type="bearer", id=new_user.id, name=new_student.name, email=new_user.email,role=new_user.role)



@router.get("/me",response_model=ShowStudent)
def get_me(db: Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    student=db.query(Student).filter(Student.user_id==current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student
    
    
@router.put("/me/edit",response_model=ShowStudent)
def edit_me(request:StudentUpdate,db: Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    student=db.query(Student).filter(Student.user_id==current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    for key,value in request.model_dump(exclude_unset=True).items():
        if hasattr(student, key):
            setattr(student, key, value)
    
    db.commit()
    
    return student

@router.get("/allProjects",response_model=list[ShowProject])
def show_projects(db: Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    projects=db.query(Project).all()
    
    return projects

@router.post("/apply/{project_id}",response_model=ShowProject)
def apply_project(project_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    if current_user.role!= 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    student=db.query(Student).filter(Student.user_id==current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    project=db.query(Project).filter(Project.id==project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    prefs=["pref1","pref2","pref3"]

    if any(getattr(student,pref)==project for pref in prefs):
        raise HTTPException(status_code=400, detail="Already applied for this project")
    
    if student.pref1:
        if project.professor.dept_id != student.pref1.professor.dept_id:
            raise HTTPException(status_code=400, detail="All project applied to have to be from the same department")
    
    for pref in prefs:
        if not getattr(student,pref):
            setattr(student,pref,project)
            project.applied_count+=1
            db.commit()
            db.refresh(student)
            db.refresh(project)
            return project
        
    raise HTTPException(status_code=400, detail="Maximum 3 projects can be applied")
    



@router.get("/appliedProjects",response_model=list[ShowProject])
def show_applied_projects(db: Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    student=db.query(Student).filter(Student.user_id==current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    applied_projects=[]
    if student.pref1:
        applied_projects.append(student.pref1)
    if student.pref2:
        applied_projects.append(student.pref2)
    if student.pref3:
        applied_projects.append(student.pref3)
    
    return applied_projects



# if student.pref1_id:
#         if project.professor.dept_id != student.pref1.professor.dept_id:
#             raise HTTPException(status_code=400, detail="All project applied to have to be from the same department")
        
#         if student.pref1 == project:
#             raise HTTPException(status_code=400, detail="Already applied for this project")

#         if student.pref2:
#             if student.pref2 == project:
#                 raise HTTPException(status_code=400, detail="Already applied for this project")

#             if student.pref3:
#                 if student.pref3 == project:
#                     raise HTTPException(status_code=400, detail="Already applied for this project")
#                 else:
#                     raise HTTPException(status_code=400, detail="Maximum 3 projects can be applied")
#             else:
#                 student.pref3=project
#                 # student.pref3_id=project.id Dont Do this bc sqlalchemy will automatically set it as we have put foreign key in relationship
#                 project.applied_count+=1
#         else:
#             student.pref2=project
            
#             project.applied_count+=1
#     else:
#         student.pref1=project
#         project.applied_count+=1
#     db.commit()
#     db.refresh(student)
#     db.refresh(project)   
#     return project