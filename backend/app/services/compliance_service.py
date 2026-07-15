import json

from app.services.ai_service import model


class ComplianceService:

    @staticmethod
    def check(summary):

        prompt = f"""
You are an Industrial Safety Auditor.

Analyze the document summary.

Return ONLY JSON.

Format:

{{
"score":95,
"passed":[
"Emergency Procedure"
],
"missing":[
"Fire Evacuation"
],
"recommendation":"..."
}}

Summary:

{summary}
"""

        response = model.generate_content(prompt)

        text = response.text

        text = text.replace("```json", "")
        text = text.replace("```", "")

        return json.loads(text)