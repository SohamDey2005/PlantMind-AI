from fastapi import APIRouter
from sqlalchemy.orm import Session
from fastapi import Depends

from app.database import get_db
from app.models import Document

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db)
):

    total = db.query(Document).count()

    ready = (
        db.query(Document)
        .filter(Document.status == "Ready")
        .count()
    )

    processing = (
        db.query(Document)
        .filter(Document.status == "Processing")
        .count()
    )

    failed = (
        db.query(Document)
        .filter(Document.status == "Failed")
        .count()
    )

    return {
        "documents": total,
        "ready": ready,
        "processing": processing,
        "failed": failed
    }