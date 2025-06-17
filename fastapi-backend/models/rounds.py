
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean,Text,DateTime, Table
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.sql.sqltypes import Float, Date


class Round(Base):
    __tablename__ = "rounds"

    id = Column(Integer, primary_key=True, default=1)  # Always 1
    number = Column(Integer, default=0)
    allow_reg = Column(Boolean, default=False)
    lock_choices=Column(Boolean, default=False)