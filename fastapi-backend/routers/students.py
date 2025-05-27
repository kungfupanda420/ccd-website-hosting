from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File,Form
from sqlalchemy.orm import Session
from datetime import date

from ..schemas.token import Token
from ..schemas.students import  ShowStudent, StudentUpdate
from ..schemas.projects import ShowProject, ProjectPreferences
from ..models.users import User, Student
from ..models.projects import Project
from ..security.JWTtoken import create_access_token, create_refresh_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user
import os
import shutil

router =APIRouter(
    prefix="/api/students",
    tags=["Students"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

get_db=get_db

UPLOAD_DIR="uploads"

def saveFile(file:UploadFile,folder:str,email:str):
    ext=file.filename.split(".")[-1]

    fileemail=email.replace("@","at").replace(".","dot")
    
    filename=f"{fileemail}.{ext}"
    folder_path=os.path.join(UPLOAD_DIR,folder)
    os.makedirs(folder_path,exist_ok=True)

    file_path=os.path.join(folder_path,filename)
    with open(file_path,"wb") as buffer:
        shutil.copyfileobj(file.file,buffer)
    return f"{file_path}"


@router.post("/register",response_model=Token)
def register(
    # Basic info
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),

    # Student fields
    phone: str = Form(...),
    dob: date = Form(...),
    address: str = Form(...),
    state: str = Form(...),
    guardianName: str = Form(...),
    guardianRelation: str = Form(...),
    guardianPhone: str = Form(...),
    institution: str = Form(...),
    program: str = Form(...),
    department: str = Form(...),
    year: str = Form(...),
    instituteLocation: str = Form(...),
    instituteState: str = Form(...),
    currentSemesterCgpa: float = Form(...),
    UG: str = Form(...),
    cgpa12: float = Form(...),
    board12: str = Form(...),
    cgpa10: float = Form(...),
    board10: str = Form(...),
    regPayment: str = Form(...),

    # Files
    regPaymentScreenshot: UploadFile = File(...),
    profilePhoto: UploadFile = File(...),

    db: Session = Depends(get_db)
):
    
    user=db.query(User).filter(User.email==email).first()
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed_password = pwd_context.hash(password)
    new_user=User(
        email=email,
        password=hashed_password,
        role='student'
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    reg_screenshot_path=saveFile(file=regPaymentScreenshot,folder="regPaymentScreenshots",email=new_user.email)
    profile_photo_path=saveFile(file=profilePhoto,folder="profilePhotos",email=new_user.email)

    new_student = Student(
        user_id=new_user.id,
        name=name,
        phone=phone,
        dob=dob,
        address=address,
        state=state,
        guardianName=guardianName,
        guardianRelation=guardianRelation,
        guardianPhone=guardianPhone,
        institution=institution,
        program=program,
        department=department,
        year=year,
        instituteLocation=instituteLocation,
        instituteState=instituteState,
        currentSemesterCgpa=currentSemesterCgpa,
        UG=UG,
        cgpa12=cgpa12,
        board12=board12,
        cgpa10=cgpa10,
        board10=board10,
        regPayment=regPayment,
        regPaymentScreenshotPath=reg_screenshot_path,
        profilePhotoPath=profile_photo_path
        # add other fields if needed
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    
    access_token=create_access_token(
        data={"sub":new_user.email}
    )
    refresh_token=create_refresh_token(
        data={"sub":new_user.email}
    )

    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer", id=new_user.id, name=new_student.name, email=new_user.email,role=new_user.role)



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

@router.delete("/withdrawProject/{project_id}",status_code=status.HTTP_204_NO_CONTENT)
def withdraw_project(project_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    student=db.query(Student).filter(Student.user_id==current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    project=db.query(Project).filter(Project.id==project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if(student.pref1 != project and student.pref2 != project and student.pref3 != project):
        raise HTTPException(status_code=400, detail="You have not applied for this project")
    
    if(student.pref1==project):
        student.pref1=student.pref2
        student.pref2=student.pref3
        student.pref3=None
    elif(student.pref2==project):
        student.pref2=student.pref3
        student.pref3=None
    elif(student.pref3==project):
        student.pref3=None
    project.applied_count-=1
    db.commit()
    db.refresh(student)
    db.refresh(project)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post("/preferences",response_model=list[ShowProject])
def increase_preference(request:ProjectPreferences,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    student=db.query(Student).filter(Student.user_id==current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    updated_projects = []

    
    if request.pref1 is not None:
        pref1 = db.query(Project).filter(Project.id == request.pref1).first()
        if not pref1:
            raise HTTPException(status_code=404, detail="Project for pref1 not found")
        student.pref1 = pref1
        updated_projects.append(pref1)
    else:
        student.pref1 = None

    
    if request.pref2 is not None:
        pref2 = db.query(Project).filter(Project.id == request.pref2).first()
        if not pref2:
            raise HTTPException(status_code=404, detail="Project for pref2 not found")
        student.pref2 = pref2
        updated_projects.append(pref2)
    else:
        student.pref2 = None

    
    if request.pref3 is not None:
        pref3 = db.query(Project).filter(Project.id == request.pref3).first()
        if not pref3:
            raise HTTPException(status_code=404, detail="Project for pref3 not found")
        student.pref3 = pref3
        updated_projects.append(pref3)
    else:
        student.pref3 = None

    db.commit()
    db.refresh(student)

    return updated_projects
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