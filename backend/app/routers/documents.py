from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Document
from app.services.document_service import DocumentService

import os

router = APIRouter()


# ----------------------------
# Upload Document
# ----------------------------
@router.post("/upload")
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    return DocumentService.process_upload(file, db)


# ----------------------------
# Get All Documents
# ----------------------------
@router.get("/documents")
def get_documents(
    db: Session = Depends(get_db),
):

    documents = (
        db.query(Document)
        .order_by(Document.upload_time.desc())
        .all()
    )

    return documents


# ----------------------------
# Delete Document
# ----------------------------
@router.delete("/documents/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
):

    document = (
        db.query(Document)
        .filter(Document.id == document_id)
        .first()
    )

    if document is None:
        return {
            "success": False,
            "message": "Document not found"
        }

    # Delete uploaded PDF
    if document.filepath and os.path.exists(document.filepath):
        os.remove(document.filepath)

    # TODO:
    # Remove embeddings belonging to this document
    # (We'll implement this in the next sprint.)

    db.delete(document)
    db.commit()

    return {
        "success": True,
        "message": "Document deleted successfully"
    }