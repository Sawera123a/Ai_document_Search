from sentence_transformers import SentenceTransformer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from transformers import pipeline
import pdfplumber
from docx import Document
import pandas as pd

# Embedding model
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# QA model
qa_model = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

# Data structure to store multiple docs
documents = {}  # {filename: {"chunks": [...], "embeddings": [...] }}

# File Readers

def read_txt(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

def read_pdf(path):
    text = ""
    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            if page.extract_text():
                text += page.extract_text() + "\n"
    return text

def read_docx(path):
    doc = Document(path)
    return "\n".join([p.text for p in doc.paragraphs])

def read_csv(path):
    df = pd.read_csv(path)
    return df.to_string(index=False)   # Convert CSV to readable text

def read_excel(path):
    df = pd.read_excel(path)
    return df.to_string(index=False)

# Build index for a document

def build_index(chunks):
    embeddings = embedder.encode(chunks)
    return embeddings, chunks

# Add document to index

def add_document(filename, text, chunk_size=200):
    # Split text into chunks
    chunks = [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]
    embeddings, chunks = build_index(chunks)
    documents[filename] = {"chunks": chunks, "embeddings": embeddings}

# Search across all docs

def search_documents(query, top_k=3):
    results = []
    query_embedding = embedder.encode([query])

    for filename, data in documents.items():
        embeddings = data["embeddings"]
        chunks = data["chunks"]

        similarities = cosine_similarity(query_embedding, embeddings)[0]
        top_indices = similarities.argsort()[-top_k:][::-1]

        for idx in top_indices:
            results.append({
                "chunk": chunks[idx],
                "score": similarities[idx],
                "source": filename
            })

    # Sort across all documents
    results = sorted(results, key=lambda x: x["score"], reverse=True)
    return results[:top_k]

# -------------------------
# Generate formatted answer
# -------------------------
def generate_answer(query):
    relevant_chunks = search_documents(query, top_k=3)
    if not relevant_chunks:
        return "No relevant information found."

    # Combine top chunks
    context = " ".join([r["chunk"] for r in relevant_chunks])

    # Run QA
    result = qa_model(question=query, context=context)

    # Yes/No detection
    answer = result["answer"]
    explanation = f"{answer} (Source: {relevant_chunks[0]['source']})"
    
    if any(word in query.lower() for word in ["does", "is", "are", "can", "has", "have"]):
        if any(word in answer.lower() for word in ["yes", "supports", "available", "included"]):
            return f"Yes. {explanation}"
        elif any(word in answer.lower() for word in ["no", "not", "none", "missing"]):
            return f"No. {explanation}"
    
    return f"{answer} (Source: {relevant_chunks[0]['source']})"