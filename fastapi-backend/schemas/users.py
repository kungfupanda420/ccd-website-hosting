from pydantic import BaseModel, EmailStr

class ShowUser(BaseModel):
    id: int
    email: EmailStr

    model_config = {
        "from_attributes": True
    }