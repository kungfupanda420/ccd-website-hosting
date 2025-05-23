from pydantic import BaseModel, EmailStr

class ShowProject(BaseModel):
    id:int
    title:str
    description:str
    no_of_interns:int
    duration:str
    mode:str
    prerequisites:str
    applied_count:int

    class Config:
        orm_mode = True

class ProjectCreation(BaseModel):

    title:str
    description:str
    no_of_interns:int
    duration:str
    mode:str
    prerequisites:str

    class Config:
        orm_mode = True