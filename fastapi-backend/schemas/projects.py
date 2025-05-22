from pydantic import BaseModel, EmailStr

class ShowProjectStudent(BaseModel):
    id: int
    title: str

    class Config:
        orm_mode = True