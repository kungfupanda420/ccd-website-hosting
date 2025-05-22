#from ..schemas.users import ShowUser,UserDetails,UserRegister, UserLogin

from pydantic import BaseModel, EmailStr
from datetime import date

from .projects import ShowProjectStudent
from .users import ShowUser

from typing import Optional
class StudentRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
#    role: str  # must be "student"

    # Student mandatory fields
    phone: str
    dob: date
    address: str
    state: str
    guardianName: str
    guardianRelation: str
    guardianPhone: str
#    profilePhotoPath: str
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
#    regPaymentScreenshotPath: str


class ShowStudent(BaseModel):
    
    user: ShowUser

    name: str
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

    pref1: Optional[ShowProjectStudent]
    pref2: Optional[ShowProjectStudent]
    pref3: Optional[ShowProjectStudent]

    

    class Config:
        orm_mode = True
