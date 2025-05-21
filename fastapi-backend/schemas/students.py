#from ..schemas.users import ShowUser,UserDetails,UserRegister, UserLogin

from pydantic import BaseModel, EmailStr
from datetime import date

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
    
class StudentLogin(BaseModel):
    email: EmailStr
    password: str