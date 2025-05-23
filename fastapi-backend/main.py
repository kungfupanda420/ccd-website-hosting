from fastapi import FastAPI
from .database import engine
from .routers import students,admin,login, professors,auth
from . import models

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)


app = FastAPI()

origins=[
    '*'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(login.router)
app.include_router(admin.router)
app.include_router(students.router)
app.include_router(professors.router)

# if __name__== "main":
#     import uvicorn
#     uvicorn.run("main.app",host="0.0.0.0",port=8000,reload=True)