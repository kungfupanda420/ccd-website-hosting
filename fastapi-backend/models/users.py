
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean,Text,DateTime, Table
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.sql.sqltypes import Float, Date


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True)
    password = Column(String(255))
    role = Column(String(255), index=True)

    # Relationships
    student = relationship("Student", back_populates="user", uselist=False)
    professor = relationship("Professor", back_populates="user", uselist=False)
    admin = relationship("Admin", back_populates="user", uselist=False)
    department = relationship("Department", back_populates="user", uselist=False)

class Student(Base):
    __tablename__ = "students"

    sip_id= Column(String(255),unique=True, index=True)
    adhaar_id= Column(String(255), unique=True)
    apaar_id= Column(String(255), unique=True)
    
    name = Column(String(255))
    phone = Column(String(255))
    dob = Column(Date)
    address = Column(String(1000))
    state = Column(String(255))

    guardianName = Column(String(255))
    guardianRelation = Column(String(255))
    guardianPhone = Column(String(255))
    
    institution = Column(String(255))
    program = Column(String(255))
    department = Column(String(255))
    year = Column(String(255))
    instituteLocation = Column(String(1000))
    instituteState = Column(String(255))

    currentSemesterCgpa = Column(Float)
    UG = Column(String(255))
    cgpa12 = Column(Float)
    board12 = Column(String(255))
    cgpa10 = Column(Float)
    board10 = Column(String(255))

    profilePhotoPath = Column(String(1000))
    documents_path = Column(String(1000))
    student_college_idcard_path = Column(String(1000))
    nitc_idcard_path = Column(String(1000))
    
    reg_payment_conf=Column(Boolean,default=False)
    offer_payment_conf=Column(Boolean,default=False)
    
    
    pref1_id=Column(Integer, ForeignKey('projects.id'))
    pref2_id=Column(Integer, ForeignKey('projects.id'))
    pref3_id=Column(Integer, ForeignKey('projects.id'))

    pref1=relationship("Project",foreign_keys=[pref1_id])
    pref2=relationship("Project",foreign_keys=[pref2_id])
    pref3=relationship("Project",foreign_keys=[pref3_id])
    


    selected_project_id = Column(Integer, ForeignKey("projects.id"), nullable=True)
    selected_project = relationship("Project",back_populates="selected_students", foreign_keys=[selected_project_id])

    admin_conf=Column(Boolean,default=False)
    start_date=Column(Date,nullable=True)
    end_date=Column(Date,nullable=True)
    
    project_report_path= Column(String(1000))
    project_report_approval=Column(Boolean,default=False)
    
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    user = relationship("User", back_populates="student")


class Department(Base):
    __tablename__ = "departments"
    name = Column(String(255))

    user_id = Column(Integer, ForeignKey("users.id"),primary_key=True)
    user = relationship("User", back_populates="department")

    professors = relationship("Professor", back_populates="department")




class Professor(Base):
    __tablename__ = "professors"
    
    name=Column(String(255))
    initial_password = Column(String(255))

    user_id = Column(Integer, ForeignKey("users.id"),primary_key=True)
    user = relationship("User", back_populates="professor")

    dept_id = Column(Integer, ForeignKey("departments.user_id"), nullable=False)
    department = relationship("Department", back_populates="professors")
    projects = relationship("Project", back_populates="professor")



class Admin(Base):
    __tablename__ = "admins"
    
    ##permissions = Column(String)
    user_id = Column(Integer, ForeignKey("users.id"), primary_key=True)
    user = relationship("User", back_populates="admin")