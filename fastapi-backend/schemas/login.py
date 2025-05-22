
from pydantic import BaseModel, EmailStr
from datetime import date

class UserLogin(BaseModel):
    email: EmailStr
    password: str