from pydantic import BaseModel, EmailStr

class DepartmentName(BaseModel):
    name:str

    model_config = {
        "from_attributes": True
    }


class ProfessorName(BaseModel):
    name:str
    department:DepartmentName

    model_config = {
        "from_attributes": True
    }

class ShowProject(BaseModel):
    id:int
    title:str
    description:str
    no_of_interns:int
    duration:str
    mode:str
    prerequisites:str
    applied_count:int
    professor:ProfessorName

    model_config = {
        "from_attributes": True
    }

class ProjectCreation(BaseModel):

    title:str
    description:str
    no_of_interns:int
    duration:str
    mode:str
    prerequisites:str

    model_config = {
        "from_attributes": True
    }