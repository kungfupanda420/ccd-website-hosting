from pydantic import BaseModel, EmailStr
from typing import Optional
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

class ProjectPreferences(BaseModel):
    pref1:Optional[int] = None
    pref2:Optional[int] = None
    pref3:Optional[int] = None

    model_config = {
        "from_attributes": True
    }