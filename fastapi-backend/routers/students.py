

from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File,Form, Query
from sqlalchemy.orm import Session
from datetime import date

from ..schemas.token import Token
from ..schemas.students import  ShowStudent, StudentUpdate, VerifyEmail
from ..schemas.projects import ShowProject, ProjectPreferencesId
from ..models.users import User, Student, Professor, Department
from ..models.projects import Project
from ..models.projects import Project
from ..security.JWTtoken import create_access_token, create_refresh_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user
import os
import shutil

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr, BaseModel

from dotenv import load_dotenv
from typing import List



router =APIRouter(
    prefix="/api/students",
    tags=["Students"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

load_dotenv()

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


def generate_sip(db: Session):
    prefix = "SIP26"

    latest_sip= db.query(Student).filter(Student.sip_id.like(f"{prefix}%")).order_by(Student.sip_id.desc()).first()
    if latest_sip and latest_sip.sip_id:
        try:
            new_sip = int(latest_sip.sip_id[len(prefix):]) + 1
        except ValueError:
            new_sip = 1
    else:
        new_sip = 1
    return f"{prefix}{new_sip:04d}"


conf = ConnectionConfig(
    MAIL_USERNAME='sip@nitc.ac.in',
    MAIL_PASSWORD=os.getenv('MAIL_PASSWORD'),
    MAIL_FROM='sip@nitc.ac.in',
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS= False,
    USE_CREDENTIALS=True
)

@router.post("/verify_email")
async def verify_email(request:VerifyEmail,db:Session=Depends(get_db)):
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email already registered")

    verify_link = f"http://localhost:3000/verify_email?email={request.email}&password={request.password}"

    message=MessageSchema(
        subject="Verify email on NITC SIP Portal",
        recipients=[request.email],
        body=f"""
        <h3>Verify email</h3>
        <p>Click the link to verify the email. Do not share this link to anyone:</p>
        <a href="{verify_link}">{verify_link}</a>
        <p>If you didn't request this, you can ignore this email.</p>
        """,
        subtype="html"
    )
    fm=FastMail(conf)
    await fm.send_message(message)
    return {"msg": f"Verification email sent to {request.email}. Please check your inbox."}

@router.post("/confirm_email", response_model=Token)
def confirm_email(email: str=Query(...), password: str=Query(...), db: Session = Depends(get_db)):
    
    user = db.query(User).filter(User.email == email).first()
    if user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    
    hashed_password=pwd_context.hash(password)

    new_user=User(
        email=email,
        password=hashed_password,
        role='Verified Email'
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    access_token = create_access_token(
        data={"sub": new_user.email}
    )
    refresh_token = create_refresh_token(
        data={"sub": new_user.email}
    )

    return Token(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        id=new_user.id,
        email=new_user.email,
        role=new_user.role
    )
        

@router.post("/register",response_model=Token)
def register(
    # Basic info
    name: str = Form(...),

    # Student fields
    adhaar_id=Form(...),
    apaar_id=Form(...),
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
    student_college_idcard: UploadFile = File(...),
    documents: UploadFile = File(...),

    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    student=db.query(Student).filter(Student.adhaar_id==adhaar_id).first()
    if student:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Adhaar ID already registered")

    student=db.query(Student).filter(Student.apaar_id==apaar_id).first()
    if student:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Apaar ID already registered")

    reg_screenshot_path=saveFile(file=regPaymentScreenshot,folder="regPaymentScreenshots",email=current_user.email)
    profile_photo_path=saveFile(file=profilePhoto,folder="profilePhotos",email=current_user.email)
    student_college_idcard_path=saveFile(file=student_college_idcard,folder="studentCollegeIdcards",email=current_user.email)
    documents_path = saveFile(file=documents, folder="studentDocuments", email=current_user.email) 
    sip_id = generate_sip(db)

    new_student = Student(
        user_id=current_user.id,
        adhaar_id=adhaar_id,
        apaar_id=apaar_id,
        sip_id=sip_id,
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
        profilePhotoPath=profile_photo_path,
        student_college_idcard_path=student_college_idcard_path,
        documents_path=documents_path,
        # add other fields if needed
    )
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    
    current_user.role = 'student'
    db.commit()
    db.refresh(current_user)

    access_token=create_access_token(
        data={"sub":current_user.email}
    )
    refresh_token=create_refresh_token(
        data={"sub":current_user.email}
    )

    return Token(access_token=access_token, refresh_token=refresh_token, token_type="bearer", id=current_user.id, name=new_student.name, email=current_user.email,role=current_user.role)



@router.get("/me",response_model=ShowStudent)
def get_me(db: Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    student=db.query(Student).filter(Student.user_id==current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student


@router.get("/profile_photo")
async def get_profile_photo(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    if not student.profilePhotoPath:
        raise HTTPException(status_code=404, detail="Profile photo not found")
    
    return {"profile_photo_path": student.profilePhotoPath}
    
@router.put("/me",response_model=ShowStudent)
def edit_me(
    # Updatable fields (add/remove as per your needs)
    name: str = Form(None),
    adhaar_id: str = Form(None),
    apaar_id: str = Form(None),
    phone: str = Form(None),
    dob: date = Form(None),
    address: str = Form(None),
    state: str = Form(None),
    guardianName: str = Form(None),
    guardianRelation: str = Form(None),
    guardianPhone: str = Form(None),
    institution: str = Form(None),
    program: str = Form(None),
    department: str = Form(None),
    year: str = Form(None),
    instituteLocation: str = Form(None),
    instituteState: str = Form(None),
    currentSemesterCgpa: float = Form(None),
    UG: str = Form(None),
    cgpa12: float = Form(None),
    board12: str = Form(None),
    cgpa10: float = Form(None),
    board10: str = Form(None),
    regPayment: str = Form(None),

    
    regPaymentScreenshot: UploadFile = File(None),
    profilePhoto: UploadFile = File(None),
    student_college_idcard: UploadFile = File(None),
    documents: UploadFile = File(None),

    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")

    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    if adhaar_id:

        student1=db.query(Student).filter(Student.adhaar_id==adhaar_id).first()

        if student1 and student.user_id!= student1.user_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Adhaar ID already registered")
    if apaar_id:

        student2=db.query(Student).filter(Student.adhaar_id==adhaar_id).first()

        if student2 and student.user_id!= student2.user_id:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Apaar ID already registered")
        
    if student.profilePhotoPath and profilePhoto:
        # If a new profile photo is provided, delete the old one
        old_profile_photo_path = student.profilePhotoPath
        if old_profile_photo_path and os.path.exists(old_profile_photo_path):
            os.remove(old_profile_photo_path)


    # Update fields if they are provided
    update_fields = locals()
    for key in [
        'name', 'adhaar_id','apaar_id', 'phone', 'dob', 'address', 'state',
        'guardianName', 'guardianRelation', 'guardianPhone',
        'institution', 'program', 'department', 'year',
        'instituteLocation', 'instituteState', 'currentSemesterCgpa',
        'UG', 'cgpa12', 'board12', 'cgpa10', 'board10', 'regPayment'
    ]:
        value = update_fields.get(key)
        if value is not None:
            setattr(student, key, value)

    # Save new files if provided
    if regPaymentScreenshot:
        student.regPaymentScreenshotPath = saveFile(file=regPaymentScreenshot,folder="regPaymentScreenshots",email= current_user.email)

    if profilePhoto:
        student.profilePhotoPath = saveFile(profilePhoto, "profilePhotos", current_user.email)

    if student_college_idcard:
        student.student_college_idcard_path = saveFile(student_college_idcard, "studentCollegeIdcards", current_user.email)

    if documents:
        student.documents_path = saveFile(documents, "studentDocuments", current_user.email)

    db.commit()
    db.refresh(student)
    return student

@router.get("/all_projects",response_model=List[ShowProject])
def show_projects(db: Session=Depends(get_db),current_user: User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    projects=db.query(Project).all()
    
    return projects

# @router.post("/apply/{project_id}",response_model=ShowProject)
# def apply_project(project_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
#     if current_user.role!= 'student':
#         raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
#     student=db.query(Student).filter(Student.user_id==current_user.id).first()
#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")
    
#     project=db.query(Project).filter(Project.id==project_id).first()
#     if not project:
#         raise HTTPException(status_code=404, detail="Project not found")
    
#     prefs=["pref1","pref2","pref3"]

#     if any(getattr(student,pref)==project for pref in prefs):
#         raise HTTPException(status_code=400, detail="Already applied for this project")
    
#     if student.pref1:
#         if project.professor.dept_id != student.pref1.professor.dept_id:
#             raise HTTPException(status_code=400, detail="All project applied to have to be from the same department")
    
#     for pref in prefs:
#         if not getattr(student,pref):
#             setattr(student,pref,project)
#             project.applied_count+=1
#             db.commit()
#             db.refresh(student)
#             db.refresh(project)
#             return project
        
#     raise HTTPException(status_code=400, detail="Maximum 3 projects can be applied")
    



@router.get("/preferences",response_model=List[ShowProject])
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

# @router.delete("/withdrawProject/{project_id}",status_code=status.HTTP_204_NO_CONTENT)
# def withdraw_project(project_id:int,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
#     if current_user.role != 'student':
#         raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
#     student=db.query(Student).filter(Student.user_id==current_user.id).first()
#     if not student:
#         raise HTTPException(status_code=404, detail="Student not found")
#     project=db.query(Project).filter(Project.id==project_id).first()
#     if not project:
#         raise HTTPException(status_code=404, detail="Project not found")
    
#     if(student.pref1 != project and student.pref2 != project and student.pref3 != project):
#         raise HTTPException(status_code=400, detail="You have not applied for this project")
    
#     if(student.pref1==project):
#         student.pref1=student.pref2
#         student.pref2=student.pref3
#         student.pref3=None
#     elif(student.pref2==project):
#         student.pref2=student.pref3
#         student.pref3=None
#     elif(student.pref3==project):
#         student.pref3=None
#     project.applied_count-=1
#     db.commit()
#     db.refresh(student)
#     db.refresh(project)
#     return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.post("/preferences",response_model=List[ShowProject])
def increase_preference(request:ProjectPreferencesId,db:Session=Depends(get_db),current_user:User=Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")
    
    student=db.query(Student).filter(Student.user_id==current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    
    updated_projects = []

    if student.pref1:
        student.pref1.applied_count -= 1
    

    if student.pref2:
        student.pref2.applied_count -= 1
    
    if student.pref3:
        student.pref3.applied_count -= 1
    
    if request.pref1_id is not None:
        pref1 = db.query(Project).filter(Project.id == request.pref1_id).first()
        if not pref1:
            raise HTTPException(status_code=404, detail="Project for pref1 not found")
        student.pref1 = pref1
        pref1.applied_count += 1
        updated_projects.append(pref1)
    else:
        student.pref1 = None

    
    if request.pref2_id is not None:
        pref2 = db.query(Project).filter(Project.id == request.pref2_id).first()
        if not pref2:
            raise HTTPException(status_code=404, detail="Project for pref2 not found")
        student.pref2 = pref2
        pref2.applied_count += 1
        updated_projects.append(pref2)
    else:
        student.pref2 = None

    
    if request.pref3_id is not None:
        pref3 = db.query(Project).filter(Project.id == request.pref3_id).first()
        if not pref3:
            raise HTTPException(status_code=404, detail="Project for pref3 not found")
        student.pref3 = pref3
        pref3.applied_count += 1
        updated_projects.append(pref3)
    else:
        student.pref3 = None

    db.commit()
    db.refresh(student)

    return updated_projects

from fastapi.responses import StreamingResponse
from PIL import Image, ImageDraw, ImageFont
import io


from PIL import Image, ImageDraw, ImageFont
import textwrap

import glob
from sqlalchemy.orm import joinedload

@router.get("/offer_letter")
def get_offer_letter(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")

    student = (
        db.query(Student)
        .join(Student.user)
        .join(Student.selected_project)
        .join(Project.professor)
        .join(Professor.department)
        .filter(Student.user_id == current_user.id)   # only current user
        .filter(Student.selected_project_id != None)
        .filter(Student.admin_conf==True)  # project selected
        .options(
            joinedload(Student.selected_project)
            .joinedload(Project.professor)
            .joinedload(Professor.department),
            joinedload(Student.user)
    )
    .first()  # just one record for current user
)
    if not student:

        raise HTTPException(status_code=404, detail="Item not found")   
    ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    TEMPLATE_PATH = os.path.join(ROOT_DIR, "templates", "Offer_Letter.png")
    FONT_PATH = os.path.join(ROOT_DIR, "templates", "SemiBold20.otf")

    original_template = Image.open(TEMPLATE_PATH).convert("RGBA")
    font = ImageFont.truetype(FONT_PATH, size=45)

    # Paste profile photo
    colour_code = "#000000"

    def draw_wrapped_text(draw, text, position, font, max_width, line_height):
        words = text.split()
        lines = []
        current_line = ""

        for word in words:
            test_line = f"{current_line} {word}".strip()
            bbox = font.getbbox(test_line)
            width = bbox[2] - bbox[0]  # x1 - x0
            if width <= max_width:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        if current_line:
            lines.append(current_line)

        x, y = position
        for line in lines:
            draw.text((x, y), line, font=font, fill=colour_code)
            y += line_height
        return y
    
    
    
    template=original_template.copy()
    draw = ImageDraw.Draw(template)


    max_text_width = 1500
    line_height = 40
    start_y = 1060

    # Line 1: Name wrapped
    start_y = draw_wrapped_text(draw,student.name, (640, 850), font, max_text_width, line_height)
    start_y += 10

    # Line 2: Mobile number
    draw.text((640, 1185),student.sip_id, font=font, fill=colour_code)
    start_y += 50

    # Line 3: Name again, wrapped
    start_y = draw_wrapped_text(draw, student.selected_project.title, (640, 1352), font, max_text_width, line_height)
    start_y += 10

    # Line 4: Name again, wrapped
    start_y = draw_wrapped_text(draw, student.selected_project.professor.name, (640, 1739), font, max_text_width, line_height)
    start_y += 10
    
    start_y = draw_wrapped_text(draw, student.selected_project.professor.user.email, (640, 1925), font, max_text_width, line_height)
    start_y += 10

    start_y = draw_wrapped_text(draw, student.selected_project.professor.department.name, (640, 2071), font, max_text_width, line_height)
    start_y += 10

    

    # Convert image to PDF
    output_pdf = template.convert("RGB")
    output = io.BytesIO()
    output_pdf.save(output, format="PDF")
    output.seek(0)

    return StreamingResponse(output, media_type="application/pdf", headers={
        "Content-Disposition": f"inline; filename={student.sip_id}_offer_letter.pdf"
    })


@router.get("/completion_certificate")
def get_completion_certificate(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    if current_user.role != 'student':
        raise HTTPException(status_code=403, detail="You are not authorized to access this resource")

    student = (
        db.query(Student)
        .join(Student.user)
        .join(Student.selected_project)
        .join(Project.professor)
        .join(Professor.department)
        .filter(Student.user_id == current_user.id)   # only current user
        .filter(Student.selected_project_id != None)  # project selected
        .filter(Student.admin_conf==True)
        .options(
            joinedload(Student.selected_project)
            .joinedload(Project.professor)
            .joinedload(Professor.department),
            joinedload(Student.user)
    )
    .first()  # just one record for current user
)
    if not student:
        raise HTTPException(status_code=404, detail="Item not found")   
    
    ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
    
    
    TEMPLATE_PATH = os.path.join(ROOT_DIR, "templates", "Completion_Certificate.png")
    FONT_PATH = os.path.join(ROOT_DIR, "templates", "OpenSans-Regular.ttf")
    BOLD_FONT_PATH = os.path.join(ROOT_DIR, "templates", "OpenSans-Bold.ttf")

    original_template = Image.open(TEMPLATE_PATH).convert("RGBA")
    regfont = ImageFont.truetype(FONT_PATH, size=36.5)
    boldfont = ImageFont.truetype(BOLD_FONT_PATH, size=36.5)

    
    LIBRE_FONT_PATH=os.path.join(ROOT_DIR, "templates", "libre-baskerville.bold.ttf")
    namefont=ImageFont.truetype(LIBRE_FONT_PATH,size=46)
    sipfont=ImageFont.truetype(LIBRE_FONT_PATH,size=40)

    # Paste profile photo
    colour_code = "#035288"
    
    def ordinal(n):
        if 10 <= n % 100 <= 20:
            suffix = 'th'
        else:
            suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(n % 10, 'th')
        return str(n) + suffix

    def format_date(dt):
        # dt is a datetime.date object
        day = ordinal(dt.day)
        month = dt.strftime("%B")   # Full month name, e.g. May
        year = dt.year
        return f"{day} {month} {year}"
    

    def draw_centered_wrapped_text(draw, text, y, font, max_width, line_height, x_center):
        words = text.split()
        lines = []
        current_line = ""

        for word in words:
            test_line = f"{current_line} {word}".strip()
            bbox = font.getbbox(test_line)
            width = bbox[2] - bbox[0]
            if width <= max_width:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        if current_line:
            lines.append(current_line)

        for line in lines:
            bbox = font.getbbox(line)
            line_width = bbox[2] - bbox[0]
            draw.text((x_center - line_width // 2, y), line, font=font, fill=colour_code)
            y += line_height
        return y

    
    def draw_centered_mixed_style_line(draw, parts, y, x_center):
        # parts = list of (text, font)
        total_width = sum((font.getbbox(text)[2] - font.getbbox(text)[0]) for text, font in parts)
        x = x_center - total_width // 2

        for text, font in parts:
            draw.text((x, y), text, font=font, fill=colour_code)
            x += font.getbbox(text)[2] - font.getbbox(text)[0]
    
    
    
    template=original_template.copy()
    draw = ImageDraw.Draw(template)


    max_text_width = 1500
    line_height = 40

    name=student.name.upper()
    draw_centered_wrapped_text(draw,name, 670, namefont, max_text_width, line_height,838)
    draw_centered_wrapped_text(draw,student.sip_id, 750, sipfont, max_text_width, line_height,838)

    # Line 1: Name wrapped
    draw_centered_wrapped_text(draw,student.selected_project.title, 880, boldfont, max_text_width, line_height,838)
    
    # # Line 2: Mobile number
    
    start_date=format_date(student.start_date)
    end_date=format_date(student.end_date)

    draw_centered_wrapped_text(draw,f"[{start_date} - {end_date}]", 940, boldfont, max_text_width, line_height,838)
    
    # # Line 3: Name again, wrapped

    mentorship_text = [
        ("under the mentorship of ", regfont),
        (f"Dr {student.selected_project.professor.name} ", boldfont),
        ("department of,", regfont)
    ]
    draw_centered_mixed_style_line(draw, mentorship_text, y=1000, x_center=830)
    
    # # Line 4: Name again, wrapped 
    draw_centered_wrapped_text(draw,student.selected_project.professor.department.name, 1060, boldfont, max_text_width, line_height,838)


    

    # Convert image to PDF
    output_pdf = template.convert("RGB")
    output = io.BytesIO()
    output_pdf.save(output, format="PDF")
    output.seek(0)

    return StreamingResponse(output, media_type="application/pdf", headers={
        "Content-Disposition": f"inline; filename={student.sip_id}_offer_letter.pdf"
    })



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

