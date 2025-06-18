
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean,Text,DateTime, Table
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.sql.sqltypes import Float, Date




class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(3000))
    duration = Column(String(2000), nullable=False)  # e.g., "3 months"
    mode = Column(String(255), nullable=False)  # e.g., "online", "offline", "hybrid"
    professor_id = Column(Integer, ForeignKey("professors.user_id"), nullable=False)
    applied_count = Column(Integer, default=0)
    prerequisites = Column(String(1000))  # Can be a JSON string or simple text

    no_of_interns=Column(Integer)
    vacancy_remaining=Column(Integer)

    professor = relationship("Professor", back_populates="projects")

    selected_students= relationship(
        "Student",
        back_populates="selected_project",
        foreign_keys="Student.selected_project_id"
    )



