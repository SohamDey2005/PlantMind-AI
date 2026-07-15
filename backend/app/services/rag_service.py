from app.services.embedding_service import EmbeddingService
from app.services.ai_service import AIService


class RAGService:

    def __init__(self):

        self.embedding = EmbeddingService()

        try:
            self.embedding.load()
        except Exception:
            pass

    def ask(self, question):

        # --------------------------
        # Retrieve relevant chunks
        # --------------------------

        results = self.embedding.search(question)

        if len(results) == 0:

            return {
                "answer": "No documents have been uploaded yet.",
                "sources": [],
                "confidence": 0
            }

        # --------------------------
        # Build Context
        # --------------------------

        context = ""

        for item in results:

            context += item["text"]
            context += "\n\n"

        # --------------------------
        # Ask Gemini
        # --------------------------

        answer = AIService.answer_question(
            context=context,
            question=question
        )

        # --------------------------
        # Collect Sources
        # --------------------------

        sources = []

        seen = set()

        for item in results:

            filename = item.get("filename")

            if filename and filename not in seen:

                seen.add(filename)

                sources.append({
                    "filename": filename,
                    "document_id": item.get("document_id")
                })

        # --------------------------
        # Return Response
        # --------------------------

        return {
            "answer": answer,
            "sources": sources,
            "confidence": 95
        }