#from ..schemas.users import ShowUser,UserDetails,UserRegister, UserLogin

from pydantic import BaseModel, EmailStr
from datetime import date

from .projects import ShowProject
from .users import ShowUser

from typing import Optional



class ShowStudent(BaseModel):
    
    user: ShowUser

    name: str
    adhaar_id:str
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

    regPayment: str
    regPaymentScreenshotPath: Optional[str]
    certificatePayment: Optional[str]
    certificatePaymentScreenshotPath: Optional[str]
    paymentStatus: int
    student_college_idcard_path: Optional[str]
    pref1: Optional[ShowProject]
    pref2: Optional[ShowProject]
    pref3: Optional[ShowProject]

    selected_project: Optional[ShowProject]

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
    regPayment: Optional[str]  = None

    model_config = {
        "from_attributes": True
    }

class StudentSIPEmail(BaseModel):
    sip_id: str
    email: EmailStr

    model_config = {
        "from_attributes": True
    }