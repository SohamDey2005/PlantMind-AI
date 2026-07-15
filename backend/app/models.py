from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import DateTime
from sqlalchemy import Text
from datetime import datetime

from .database import Base


class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True)

    filename = Column(String, nullable=False)

    filetype = Column(String)

    filepath = Column(String)

    summary = Column(Text)

    equipment = Column(Text)

    ppe = Column(Text)

    risks = Column(Text)

    maintenance_interval = Column(String)

    status = Column(String, default="Processing")

    upload_time = Column(
        DateTime,
        default=datetime.utcnow
    )