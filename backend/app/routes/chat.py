from fastapi import APIRouter
from pydantic import BaseModel
from app.services import rag  # rag functions import

router = APIRouter(prefix="/chat", tags=["chat"])

class Question(BaseModel):
    question: str

@router.post("/")
async def ask_ai(data: Question):
    if not rag.documents:   # <-- directly check rag.documents
        return {"error": "No document uploaded yet. Please upload a file first."}

    # Generate answer from RAG
    answer = rag.generate_answer(data.question)
    return {"answer": answer}
