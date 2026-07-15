import fitz  # PyMuPDF


class PDFService:
    @staticmethod
    def extract_text(pdf_path: str) -> str:
        """
        Extract all text from a PDF.

        Args:
            pdf_path (str): Path to the PDF file.

        Returns:
            str: Extracted text.
        """

        document = fitz.open(pdf_path)

        text = ""

        for page in document:
            text += page.get_text()
            text += "\n"

        document.close()

        return text.strip()