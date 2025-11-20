import json
from typing import  List

from fastapi import APIRouter, FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse, JSONResponse
from pydantic import BaseModel, Field

from ai_client import generate_text, chat_once, stream_generate

router = APIRouter()

class GenerateRequest(BaseModel):
    prompt: str = Field(..., example="Explain the difference between REST and GraphQL.")

class GenerateResponse(BaseModel):
    prompt: str
    response: str

@router.post("/ai/generate", response_model=GenerateResponse)
def ai_generate(req: GenerateRequest):
    try:
        text = generate_text(req.prompt)
        return GenerateResponse(prompt=req.prompt, response=text)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

class ChatMessage(BaseModel):
    role: str = Field(..., example="user")
    content: str = Field(..., example="Summarize FastAPI in one sentence.")

class ChatRequest(BaseModel):
    messages: List[ChatMessage] = Field(..., example=[{"role":"user","content":"Hello"}])

class ChatResponse(BaseModel):
    messages: List[ChatMessage]
    response: str

@router.post("/ai/chat", response_model=ChatResponse)
def ai_chat(req: ChatRequest):
    if not req.messages:
        raise HTTPException(status_code=400, detail="messages required")
    try:
        text = chat_once([m.dict() for m in req.messages])
        return ChatResponse(messages=req.messages, response=text)
    except Exception as e:
        raise HTTPException(status_code=502, detail=str(e))

class StreamRequest(BaseModel):
    prompt: str = Field(..., example="Stream a two-line poem about coding.")

@router.post("/ai/stream")
def ai_stream(req: StreamRequest):
    prompt = req.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="prompt is required")

    def sse_gen():
        try:
            for chunk in stream_generate(prompt):
                yield f'data: {json.dumps({"chunk": chunk})}\n\n'
            yield 'event: done\ndata: {"done": true}\n\n'
        except Exception as e:
            yield f'event: error\data: {json.dumps({"error": str(e)})}\n\n'

    return StreamingResponse(sse_gen(), media_type="text/event-stream")

def register_routes(app: FastAPI):
    app.include_router(router)