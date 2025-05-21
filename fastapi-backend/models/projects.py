
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean,Text,DateTime, Table
from sqlalchemy.orm import relationship
from ..database import Base
from sqlalchemy.sql.sqltypes import Float, Date


profProject = Table('profProject', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id',ondelete="CASCADE")),
    Column('project_id', Integer, ForeignKey('projects.id',ondelete="CASCADE"))
)
class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(String(1000))
    no_of_interns = Column(Integer, nullable=False)
    duration = Column(String(255), nullable=False)  # e.g., "3 months"
    mode = Column(String(255), nullable=False)  # e.g., "online", "offline", "hybrid"
    professor_id = Column(Integer, ForeignKey("professors.user_id"), nullable=False)
    applied_count = Column(Integer, default=0)
    prerequisites = Column(String(1000))  # Can be a JSON string or simple text

    professor = relationship(
        "User",
        secondary=profProject,
        back_populates="projects"
    )


