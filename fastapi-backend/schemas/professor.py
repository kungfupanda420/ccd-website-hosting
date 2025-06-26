from pydantic import BaseModel, Field
from typing import Optional, List

from .projects import DepartmentName, ShowProject
from .users import ShowUser

class ShowProfessorDet(BaseModel):
    
    name:str
    user:ShowUser
    department:DepartmentName
    model_config = {
        "from_attributes": True
    }


class ShowProfessorProj(BaseModel):
    name:str
    user:ShowUser
    department:DepartmentName
    projects: Optional[List[ShowProject]] 

    model_config = {
        "from_attributes": True
    }