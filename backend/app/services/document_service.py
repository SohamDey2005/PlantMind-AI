import os
import json
import shutil
from datetime import datetime

import fitz
from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models import Document
from app.services.ai_service import AIService
from app.services.embedding_service import EmbeddingService


UPLOAD_FOLDER = "app/uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


class DocumentService:

    @staticmethod
    def extract_text(filepath: str) -> str:
        """
        Extract text from a PDF using PyMuPDF.
        """

        pdf = fitz.open(filepath)

        text = ""

        for page in pdf:
            text += page.get_text()

        pdf.close()

        return text

    @staticmethod
    def split_text(text, chunk_size=500):
        """
        Split long text into smaller chunks.
        """

        chunks = []

        for i in range(0, len(text), chunk_size):
            chunk = text[i:i + chunk_size].strip()

            if chunk:
                chunks.append(chunk)

        return chunks

    @staticmethod
    def process_upload(file: UploadFile, db: Session):

        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        # -----------------------------
        # Save uploaded PDF
        # -----------------------------

        with open(filepath, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # -----------------------------
        # Create DB Record
        # -----------------------------

        document = Document(
            filename=file.filename,
            filetype=file.content_type,
            filepath=filepath,
            summary="",
            equipment="[]",
            status="Processing",
            upload_time=datetime.utcnow()
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        try:

            # -----------------------------
            # Extract PDF Text
            # -----------------------------

            text = DocumentService.extract_text(filepath)

            if not text.strip():
                raise Exception("Unable to extract text from PDF.")

            # -----------------------------
            # Gemini Analysis
            # -----------------------------

            ai_result = AIService.analyze_document(text)

            summary = ai_result.get(
                "summary",
                ""
            )

            equipment = ai_result.get(
                "equipment",
                []
            )

            # -----------------------------
            # Save AI Output
            # -----------------------------

            document.summary = summary
            
            document.equipment = json.dumps(
                ai_result.get("equipment", [])
            )
            
            document.ppe = json.dumps(
                ai_result.get("ppe", [])
            )
            
            document.risks = json.dumps(
                ai_result.get("risks", [])
            )
            
            document.maintenance_interval = ai_result.get(
                "maintenance_interval",
                ""
            )
            
            document.status = "Ready"
            
            db.commit()

            # -----------------------------
            # Generate Embeddings
            # -----------------------------

            chunks = DocumentService.split_text(text)

            embedding = EmbeddingService()

            try:
                embedding.load()
            except Exception:
                pass

            embedding.add_chunks(chunks)

            embedding.save()

            return {
                "success": True,
                "document": {
                    "id": document.id,
                    "filename": document.filename,
                    "summary": summary,
                    "equipment": equipment,
                    "status": document.status
                }
            }

        except Exception as e:

            document.status = "Failed"

            db.commit()

            return {
                "success": False,
                "message": str(e)
            }