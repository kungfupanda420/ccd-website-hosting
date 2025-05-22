from pydantic import BaseModel, EmailStr

class ShowUser(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True