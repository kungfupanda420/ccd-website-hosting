from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File,Form
from sqlalchemy.orm import Session
from datetime import date

from ..schemas.token import Token
from ..schemas.students import  ShowStudent, StudentUpdate
from ..schemas.projects import ShowProject, ProjectPreferences
from ..models.users import User, Student
from ..models.projects import Project
from ..security.JWTtoken import create_access_token, create_refresh_token
from ..database import get_db

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from ..security.oauth2 import get_current_user
