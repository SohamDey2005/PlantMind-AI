from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database import Base, engine

from app.routers import documents
from app.routers import chat
from app.routers import dashboard
from app.routers import knowledge
from app.routers import compliance

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PlantMind AI",
    version="1.0.0",
    description="Industrial AI Copilot using RAG + Gemini"
)


# -------------------------
# CORS
# -------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------
# Static Files
# -------------------------

app.mount(
    "/app/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)


# -------------------------
# Routers
# -------------------------

app.include_router(documents.router)
app.include_router(chat.router)
app.include_router(dashboard.router)
app.include_router(knowledge.router)
app.include_router(compliance.router)

# -------------------------
# Health Check
# -------------------------

@app.get("/")
def home():

    return {
        "status": "running",
        "application": "PlantMind AI",
        "version": "1.0.0"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }