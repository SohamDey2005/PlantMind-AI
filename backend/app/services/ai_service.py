import os
import json

from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash-lite"
)


class AIService:

    @staticmethod
    def analyze_document(text: str):

        prompt = f"""
You are PlantMind AI.

You are an industrial document analysis expert.

Analyze the document below.

Return ONLY valid JSON.

JSON Format:

{{
    "summary": "...",
    "equipment": [],
    "ppe": [],
    "maintenance_interval": "",
    "risks": []
}}

Rules:

- Do NOT explain.
- Do NOT wrap the JSON inside markdown.
- Do NOT add extra text.
- Return valid JSON only.

Document:

{text[:12000]}
"""

        try:

            response = model.generate_content(prompt)

            result = response.text.strip()

            # Remove markdown if Gemini returns it
            result = result.replace("```json", "")
            result = result.replace("```", "")
            result = result.strip()

            data = json.loads(result)

            return {
                "summary": data.get("summary", ""),
                "equipment": data.get("equipment", []),
                "ppe": data.get("ppe", []),
                "maintenance_interval": data.get(
                    "maintenance_interval",
                    ""
                ),
                "risks": data.get("risks", [])
            }

        except Exception as e:

            print("Gemini Error:", e)

            return {
                "summary": "Unable to analyze document.",
                "equipment": [],
                "ppe": [],
                "maintenance_interval": "",
                "risks": []
            }

    @staticmethod
    def answer_question(context, question):

        prompt = f"""
You are PlantMind AI.

You answer ONLY from the supplied industrial document context.

Rules:

- Never invent information.
- If the answer is not present, reply:

"I couldn't find that information in the uploaded documents."

Context:

{context}

Question:

{question}

Provide a professional answer using bullet points whenever appropriate.
"""

        try:

            response = model.generate_content(prompt)

            return response.text.strip()

        except Exception:

            return (
                "Unable to generate an answer at the moment."
            )