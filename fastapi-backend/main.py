from fastapi import FastAPI
from .database import engine
from .routers import students,admin,login, professors,auth
from . import models

from fastapi.middleware.cors import CORSMiddleware

from fastapi.staticfiles import StaticFiles
import os

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
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  #getting the full absolute path of the directory where your main.py file is located
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


app.include_router(auth.router)
app.include_router(login.router)
app.include_router(admin.router)
app.include_router(students.router)
app.include_router(professors.router)

# if __name__== "main":
#     import uvicorn
#     uvicorn.run("main.app",host="0.0.0.0",port=8000,reload=True)