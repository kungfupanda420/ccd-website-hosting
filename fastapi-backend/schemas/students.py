#from ..schemas.users import ShowUser,UserDetails,UserRegister, UserLogin

from pydantic import BaseModel, EmailStr
from datetime import date

from .projects import ShowProject, ShowProjectAdmin
from .users import ShowUser

from typing import Optional

from datetime import date

class VerifyEmail(BaseModel):
    email: EmailStr
    password: str


    model_config = {
        "from_attributes": True
    }

class ShowStudent(BaseModel):
    
    user: ShowUser
    sip_id:str
    name: str
    adhaar_id:str
    apaar_id:str
    phone: str
    dob: date
    address: str
    state: str
    guardianName: str
    guardianRelation: str
    guardianPhone: str
    profilePhotoPath: Optional[str]
    institution: str
    program: str
    department: str
    year: str
    instituteLocation: str
    instituteState: str
    currentSemesterCgpa: float
    UG: str
    cgpa12: float
    board12: str
    cgpa10: float
    board10: str

    admin_conf:bool
    start_date:Optional[date]
    end_date:Optional[date]
    pref1: Optional[ShowProject]
    pref2: Optional[ShowProject]
    pref3: Optional[ShowProject]

    selected_project: Optional[ShowProject]
    documents_path: Optional[str]
    profilePhotoPath: Optional[str]
    student_college_idcard_path: Optional[str]

    model_config = {
        "from_attributes": True
    }



class StudentUpdate(BaseModel):
    name: Optional[str]  = None


    phone: Optional[str]  = None
    dob: Optional[date]  = None
    address: Optional[str]  = None
    state: Optional[str]  = None
    guardianName: Optional[str]  = None
    guardianRelation: Optional[str]  = None
    guardianPhone: Optional[str]  = None

    institution: Optional[str]  = None
    program: Optional[str]  = None
    department: Optional[str]  = None
    year: Optional[str]  = None
    instituteLocation: Optional[str]  = None
    instituteState: Optional[str]  = None
    currentSemesterCgpa: Optional[float]  = None
    UG: Optional[str]  = None
    cgpa12: Optional[float]  = None
    board12: Optional[str]  = None
    cgpa10: Optional[float]  = None
    board10: Optional[str]  = None

    model_config = {
        "from_attributes": True
    }

class StudentSIPNameProj(BaseModel):
    sip_id: str
    name: str
    pref1:Optional[ShowProject] = None
    pref2:Optional[ShowProject] = None
    pref3:Optional[ShowProject] = None
    selected_project:Optional[ShowProject] = None

    model_config = {
        "from_attributes": True
    }

class SetDate(BaseModel):
    date:date

    model_config = {
        "from_attributes": True
    }


class ShowStudentBasic(BaseModel):
    user: ShowUser
    sip_id:str
    name: str
    model_config = {
        "from_attributes": True
    }

class ShowStudentAdmin(BaseModel):
    user: ShowUser
    sip_id:str
    name: str
    adhaar_id:str
    apaar_id:str
    phone: str
    dob: date
    address: str
    state: str
    guardianName: str
    guardianRelation: str
    guardianPhone: str
    
    institution: str
    program: str
    department: str
    year: str
    instituteLocation: str
    instituteState: str
    currentSemesterCgpa: float
    UG: str
    cgpa12: float
    board12: str
    cgpa10: float
    board10: str

    
    admin_conf:bool
    start_date:Optional[date]
    end_date:Optional[date]
    

    selected_project: Optional[ShowProjectAdmin]
    model_config = {
        "from_attributes": True
    }