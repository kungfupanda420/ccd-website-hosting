from pydantic import BaseModel, EmailStr
from typing import Optional
from typing import List

class DepartmentName(BaseModel):
    name:str

    model_config = {
        "from_attributes": True
    }


class ProfessorNameDept(BaseModel):
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
    no_of_interns :int
    vacancy_remaining:int
    professor:ProfessorNameDept

    model_config = {
        "from_attributes": True
    }

class ShowProjectAdmin(BaseModel):
    id:int
    title:str
    professor:ProfessorNameDept

    model_config = {
        "from_attributes": True
    }

class ProjectCreation(BaseModel):

    title:str
    description:str
    duration:str
    mode:str
    prerequisites: Optional[str] = None 
    no_of_interns:int

    model_config = {
        "from_attributes": True
    }

class ProjectPreferences(BaseModel):
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

class StudentSIP(BaseModel):
    sip_id:str
    name: str
    admin_conf:bool
    model_config = {
        "from_attributes": True
    }

class ProfessorName(BaseModel):
    name:str
    model_config = {
        "from_attributes": True
    }

class ProjectStudents(BaseModel):
    title:str
    professor:ProfessorName
    selected_students:List[StudentSIP]