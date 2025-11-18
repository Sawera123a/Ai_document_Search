# from fastapi import APIRouter, UploadFile, File
# import os

# router = APIRouter(prefix="/upload", tags=["Upload"])

# DOCUMENTS = []

# @router.post("/")
# async def upload_file(file: UploadFile = File(...)):
#     global DOCUMENTS
#     content = await file.read()
#     text = content.decode("utf-8")

#     chunks = text.split("\n")
#     DOCUMENTS = chunks   # Save globally

#     return {"message": "File uploaded successfully!", "chunks": len(chunks)}


# from fastapi import APIRouter, UploadFile, File, Request

# router = APIRouter(prefix="/upload", tags=["Upload"])

# @router.post("/")
# async def upload_file(request: Request, file: UploadFile = File(...)):
#     content = await file.read()
#     text = content.decode("utf-8")

#     chunks = text.split("\n")
#     request.app.state.DOCUMENTS = chunks  # Store in global app state

#     return {"message": "File uploaded successfully!", "chunks": len(chunks)}


# from fastapi import APIRouter, UploadFile, File
# from app.services.rag import add_document

# router = APIRouter(prefix="/upload", tags=["Upload"])

# @router.post("/")
# async def upload_file(file: UploadFile = File(...)):
#     content = await file.read()
#     text = content.decode("utf-8")

#     chunks = text.split("\n")  # simple splitting
#     doc_id = file.filename

#     # Save into ChromaDB
#     add_document(doc_id, chunks)

#     return {"message": f"{file.filename} uploaded and indexed!", "chunks": len(chunks)}




from fastapi import APIRouter, UploadFile, File, Request
import os
from app.services import rag  # <-- import rag functions

router = APIRouter(prefix="/upload", tags=["Upload"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/")
async def upload_file(request: Request, file: UploadFile = File(...)):
    # Save uploaded file
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())

    # Detect file type & read content
    if file.filename.endswith(".txt"):
        text = rag.read_txt(file_path)
    elif file.filename.endswith(".pdf"):
        text = rag.read_pdf(file_path)
    elif file.filename.endswith(".docx"):
        text = rag.read_docx(file_path)
    elif file.filename.endswith(".csv"):
        text = rag.read_csv(file_path)
    elif file.filename.endswith(".xlsx"):
        text = rag.read_excel(file_path)
    else:
        return {"error": f"Unsupported file type: {file.filename}"}

    # Add to RAG pipeline
    rag.add_document(file.filename, text)

    return {"message": f"File '{file.filename}' uploaded successfully!"}