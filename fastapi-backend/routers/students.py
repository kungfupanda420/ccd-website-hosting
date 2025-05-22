from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from ..schemas.token import Token
from ..schemas.students import StudentRegister, ShowStudent
from ..models.users import User, Student
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
    
    

# @router.delete("/users/delete/{id}")
# def user_delete(id:int, current_user: User=Depends(get_current_user), db:Session=Depends(get_db)):
#     if(current_user.id != id):
#         raise HTTPException(status_code=403, detail="You can only delete your own account")
#     db.delete(current_user)
#     db.commit()
#     return Response(status_code=status.HTTP_204_NO_CONTENT)