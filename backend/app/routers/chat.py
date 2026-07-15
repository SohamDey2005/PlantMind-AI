from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag_service import RAGService


router = APIRouter(
    prefix="/chat",
    tags=["AI Chat"]
)


rag = RAGService()


class ChatRequest(BaseModel):
    question: str


@router.post("/")
def ask_question(request: ChatRequest):

    result = rag.ask(request.question)

    return result