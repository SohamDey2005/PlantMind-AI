from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Document

from app.services.knowledge_graph_service import (
    KnowledgeGraphService
)

router = APIRouter(
    prefix="/knowledge",
    tags=["Knowledge Graph"]
)


@router.get("/")
def knowledge_graph(
    db: Session = Depends(get_db)
):

    documents = db.query(Document).all()

    return KnowledgeGraphService.build_graph(
        documents
    )