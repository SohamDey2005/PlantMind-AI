from pydantic import BaseModel
from datetime import datetime


class DocumentResponse(BaseModel):

    id: int

    filename: str

    filetype: str

    filepath: str

    upload_time: datetime

    class Config:
        from_attributes = True