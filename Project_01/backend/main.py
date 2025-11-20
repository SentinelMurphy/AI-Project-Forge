import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List, Dict

app = FastAPI(
    title="Forge FastAPI Backend",
    version="0.1.0",
    description="Simple API returning fake data for the Vite React frontend."
)

# Allow requests from your Vite dev server
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Fake in-memory dataset
FAKE_ITEMS: List[Dict] = [
    {"id": 1, "name": "Chris Widget", "price": 19.99, "in_stock": True},
    {"id": 2, "name": "Sami Gadget", "price": 29.5, "in_stock": False},
    {"id": 3, "name": "Aishling Tool", "price": 9.75, "in_stock": True},
]

@app.get("/health")
def health():
    return {"status": "ok", "ts": datetime.utcnow().isoformat()}

@app.get("/items")
def get_items():
    return {
        "count": len(FAKE_ITEMS),
        "items": FAKE_ITEMS
    }

@app.get("/items/{item_id}")
def get_item(item_id: int):
    for item in FAKE_ITEMS:
        if item["id"] == item_id:
            return item
    return {"error": "Item not found"}

from router import register_routes

register_routes(app)

@app.get("/")
def index():
    return {
        "service": "Forge Backend",
        "version": app.version,
        "endpoints": [
            "/health",
            "/items",
            "/items/{item_id}",
            "/ai/generate",
            "/ai/chat",
            "/ai/stream",
        ],
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", "8000")),
        reload=True,
    )