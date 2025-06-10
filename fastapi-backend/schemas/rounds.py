from pydantic import BaseModel

class RoundDetails(BaseModel):
    number:int
    allow_reg:bool
    
    model_config = {
        "from_attributes": True
    }