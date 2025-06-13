from pydantic import BaseModel

class RoundDetails(BaseModel):
    number:int
    allow_reg:bool
    lock_choices:bool
    
    model_config = {
        "from_attributes": True
    }

class InputPassword(BaseModel):
    password:str