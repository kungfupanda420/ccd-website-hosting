from pydantic import BaseModel, EmailStr
from datetime import date

class DeptDataMessage(BaseModel):
    message:str
    