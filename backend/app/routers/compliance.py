from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Document

from app.services.compliance_service import (
    ComplianceService
)

router = APIRouter(
    prefix="/compliance",
    tags=["Compliance"]
)


@router.get("/{document_id}")
def compliance(
    document_id: int,
    db: Session = Depends(get_db)
):

    document = db.query(Document).get(document_id)

    if document is None:
        return {
            "message": "Document not found"
        }

    return ComplianceService.check(
        document.summary
    )