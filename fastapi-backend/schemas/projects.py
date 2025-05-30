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
    duration:str
    mode:str
    prerequisites:str

    model_config = {
        "from_attributes": True
    }

class ProjectPreferences(BaseModel):
    pref1:Optional[ShowProject] = None
    pref2:Optional[ShowProject] = None
    pref3:Optional[ShowProject] = None

    model_config = {
        "from_attributes": True
    }

class ProjectPreferencesId(BaseModel):
    pref1_id:Optional[int] = None
    pref2_id:Optional[int] = None
    pref3_id:Optional[int] = None

    model_config = {
        "from_attributes": True
    }