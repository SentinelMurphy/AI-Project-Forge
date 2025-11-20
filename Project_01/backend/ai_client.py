import os
from typing import Dict, List, Optional, Iterable
from dotenv import load_dotenv
import ollama
from ollama import Client

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), ".env"))

HOST = os.getenv("OLLAMA_HOST", "").strip()
API_KEY = os.getenv("OLLAMA_API_KEY", "").strip()
MODEL = os.getenv("OLLAMA_MODEL", "qwen3-coder:480b-cloud").strip()

if not HOST:
    HOST = "https://api.ollama.ai"
    print("[ai_client] OLLAMA_HOST not set; defaulting to Cloud:", HOST)

if not API_KEY:
    raise RuntimeError("Missing OLLAMA_API_KEY (required for Ollama Cloud).")

os.environ["OLLAMA_HOST"] = HOST
os.environ["OLLAMA_API_KEY"] = API_KEY

client = Client(host=HOST)

def _model(m: Optional[str] = None) -> str:
    return (m or MODEL).strip()

def generate_text(prompt: str, model: Optional[str] = None) -> str:

    resp = client.generate(model=_model(model), prompt=prompt, stream=False)
    return (resp.get("response") or "").strip()

def chat_once(messages: List[Dict[str, str]], model: Optional[str] = None) -> str:

    resp = client.chat(model=_model(model), messages=messages, stream=False)
    msg = resp.get("message") or {}
    return (msg.get("content") or "").strip()

def stream_generate(prompt: str, model: Optional[str] = None) -> Iterable[str]:

    for part in client.generate(model=_model(model), prompt=prompt, stream=True):
        chunk = part.get("response")
        if chunk:
            yield chunk
        if part.get("done"):
            break

def stream_chat(messages: List[Dict[str, str]], model: Optional[str] = None) -> Iterable[str]:

    for part in client.chat(model=_model(model), messages=messages, stream=True):
        msg = part.get("message") or {}
        chunk = msg.get("content") or part.get("response")
        if chunk:
            yield chunk
        if part.get("done"):
            break