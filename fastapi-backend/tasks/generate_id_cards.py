from fastapi import APIRouter, Depends, HTTPException, status, Response, UploadFile, File, Form
from sqlalchemy.orm import Session

from schemas.token import Token
from schemas.admin import DeptDataMessage
from schemas.projects import ProjectStudents
from schemas.rounds import RoundDetails
from models.users import User,Admin, Professor, Department, Student
from models.projects import Project
from models.rounds import Round
from security.JWTtoken import create_access_token
from database import get_db, SessionLocal

from passlib.context import CryptContext

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from security.oauth2 import get_current_user

import pandas as pd
import random
import string


from fastapi.responses import StreamingResponse
from PIL import Image, ImageDraw, ImageFont
import io
import os

from typing import List

import glob
from sqlalchemy.orm import joinedload

from celery_worker import celery_app

@celery_app.task(name="fastapi-backend/tasks/generate_id_cards.generate_id_cards")
def generate_id_cards():
    db=SessionLocal()
    
    ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.join(os.path.abspath(__file__)))))
    IDS_DIR = os.path.join(ROOT_DIR, "IDS")
    TEMPLATE_PATH = os.path.join(ROOT_DIR, "templates", "id_card_template.png")
    FONT_PATH = os.path.join(ROOT_DIR, "templates", "Nexa-Heavy.ttf")

    original_template = Image.open(TEMPLATE_PATH).convert("RGBA")
    font = ImageFont.truetype(FONT_PATH, size=45)

    # Paste profile photo
    colour_code = "#3f0eaf"
    def round_corners(image, radius):
    # Create rounded mask
        rounded_mask = Image.new("L", image.size, 0)
        draw = ImageDraw.Draw(rounded_mask)
        draw.rounded_rectangle([0, 0, image.size[0], image.size[1]], radius=radius, fill=255)

        # Apply mask to the image alpha channel
        rounded_image = image.copy()
        rounded_image.putalpha(rounded_mask)
        return rounded_image
    def draw_wrapped_text(draw, text, position, font, max_width, line_height):
        words = text.split()
        lines = []
        current_line = ""

        for word in words:
            test_line = f"{current_line} {word}".strip()
            bbox = font.getbbox(test_line)
            width = bbox[2] - bbox[0]  # x1 - x0
            if width <= max_width:
                current_line = test_line
            else:
                lines.append(current_line)
                current_line = word
        if current_line:
            lines.append(current_line)

        x, y = position
        for line in lines:
            draw.text((x, y), line, font=font, fill=colour_code)
            y += line_height
        return y
    
    students=(
        db.query(Student)
        .join(Student.user)
        .join(Student.selected_project)
        .join(Project.professor)
        .join(Professor.department)
        .filter(Student.selected_project_id!=None)
        .filter(Student.admin_conf==True)
        .filter(Student.offer_payment_conf==True)
        .options(
            joinedload(Student.selected_project)
            .joinedload(Project.professor)
            .joinedload(Professor.department),
            joinedload(Student.user)

        ).all()
    )
    
    for student in students:
        
        template=original_template.copy()
        draw = ImageDraw.Draw(template)

        email=student.user.email
        fileemail = email.replace("@", "at").replace(".", "dot")
        Profile_PATH = os.path.join(ROOT_DIR, "uploads", "profilePhotos")
        matching_files = glob.glob(os.path.join(Profile_PATH, f"{fileemail}.*"))

        if not matching_files:
            print("Profile photo not found:", email)
            
        PFP_PATH = matching_files[0]

        try:
            student_image = Image.open(PFP_PATH).convert("RGBA")
            student_image = student_image.resize((500, 600))
            student_image = round_corners(student_image, radius=15)

            template.paste(student_image, (150, 350),student_image)
        except FileNotFoundError:
            print("Photo not found")

        # Utility to wrap text

        max_text_width = 500
        line_height = 40
        start_y = 1060

        # Line 1: Name wrapped
        start_y = draw_wrapped_text(draw,student.name, (340, 1057), font, max_text_width, line_height)
        start_y += 10

        # Line 2: Mobile number
        draw.text((340, 1205),student.sip_id, font=font, fill=colour_code)
        start_y += 50

        # Line 3: Name again, wrapped
        start_y = draw_wrapped_text(draw, student.phone, (340, 1282), font, max_text_width, line_height)
        start_y += 10

        # Line 4: Name again, wrapped
        start_y = draw_wrapped_text(draw, student.selected_project.professor.name, (340, 1346), font, max_text_width, line_height)
        start_y += 10

        start_y = draw_wrapped_text(draw, student.selected_project.professor.department.name, (340, 1456), font, max_text_width, line_height)
        start_y += 10

        # Line 5: Date
        draw.text((340, 1626), "10 July 2025", font=font, fill=colour_code)

        # Save the ID card
        output_pdf = template.convert("RGB")
        os.makedirs(IDS_DIR, exist_ok=True)
        save_path = os.path.join(IDS_DIR, f"{student.sip_id}_id_card.pdf")
        output_pdf.save(save_path, format="PDF")
    
    db.close()
    return f"{len(students)} ID cards generated."