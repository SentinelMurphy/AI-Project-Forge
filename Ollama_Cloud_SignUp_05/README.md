# 1) Integrating Ollama Cloud (AI) into FastAPI and React

This section adds AI endpoints powered by Ollama Cloud and a simple UI page.


# 2) Add a .gitignore to the backend

Why add a .gitignore?
- Prevent committing your virtual environment, local caches, compiled files, and secret files (like `.env`) to GitHub.
- Keeps the repository clean and avoids accidentally leaking sensitive data (API keys, DB files).
- Makes clones smaller for contributors.

Where: `Project/backend/.gitignore`

Create the file at `Project/backend/.gitignore` with the contents below. Adjust as needed for your editor/OS.

Recommended `.gitignore` contents:
```gitignore
# Python caches and compiled files
__pycache__/
*.py[cod]
*$py.class

# Virtual environments[.gitignore](../Project_01/backend/.gitignore)
venv/
.venv/
env/
env.bak/

# Environment / secrets
.env
.env.*     # e.g., .env.local
secrets.yaml

# Build / package metadata
pip-wheel-metadata/
*.egg-info/
dist/
build/

# Mypy / pytest
.mypy_cache/
.pytest_cache/

# IDEs and editors
.vscode/
.idea/
*.sublime-workspace
*.sublime-project

# OS files
.DS_Store
Thumbs.db

# Logs and databases
*.log
*.sqlite3
*.db

# Coverage
.coverage
htmlcov/

# Editor swap/temp files
*~ 
*.swp


```

How to add & commit:
1. Create the file:
    - Windows (PowerShell):
      ```
      cd Project/backend
      notepad .gitignore
      ```
    - Linux/macOS:
      ```
      cd Project/backend
      nano .gitignore
      ```
   Paste contents and save.


2. Commit:
```
git add Project/backend/.gitignore
git commit -m "backend: add .gitignore to ignore venv, env, caches and logs"
git push
```

# 3 ) Sign Up & Get API Key

1. Visit the Ollama Cloud portal (official site).
2. Create an account (email / OAuth).
3. Navigate to “API Keys”.
4. Generate a key (e.g., `23b148ba9ae84examplekey179655`).
5. Copy and store securely.

## 4 ) Install Ollama CLI

### Windows (PowerShell)


Option A: Manual installer
1. Download the Windows installer from the official Ollama site.
2. Run installer (accept defaults).
3. Open a new PowerShell window.

Verify:
```
ollama --version
```

### Linux (bash)

Most distros offer a script or package. Example generic script (adjust from official docs):

```
curl -fsSL https://ollama.com/install.sh | sh
```

If using a package manager (example for Debian/Ubuntu if available):
```
sudo apt update
sudo apt install ollama
```

Verify:
```
ollama --version
```


## 5 ) CLI Login (Interactive)

### Windows (PowerShell)
```
ollama signin
```
- A URL will be opened or displayed. If the browser doesn't auto-open, copy the URL into your browser.
- Complete authentication (GitHub / email / other).
- On success, the CLI stores credentials in your user profile location.

### Linux (bash)
```
ollama signin
```
- Follow same browser flow.

``
  You need to be signed in to Ollama to run Cloud models.
  To sign in, navigate to click on link and signin:
``
- Once your at the ollama.com site and your login in you should now see `Connect device`
- Once you have your device connected to your ollama account you can now use ollama cloud modals.
- In your Terminal run `ollama run deepseek-v3.1:671b-cloud`

After login, you can test listing tags :
```
ollama list
```
For Cloud-specific models you may still need explicit API key export; the interactive login may not automatically populate `OLLAMA_API_KEY` for your Python process. If `ollama list` only shows local models, proceed to API key step.

## 16.4 Generate / Retrieve API Key (Portal Method)

1. Visit the Ollama Cloud portal (account dashboard).
2. Navigate to "API Keys".
3. Create a new key (copy it immediately).
4. Store securely (password manager or local encrypted vault).

## 16.5 Environment Setup (.env)

Create or edit `Project_01/backend/.env`:
```
OLLAMA_HOST=https://api.ollama.ai
OLLAMA_API_KEY=ollama_sk_live_XXXXXXXXXXXXXXXX
OLLAMA_MODEL=deepseek-v3.1:671b-cloud
```

Why `localhost` for backend host and cloud host separately:
- Backend listens at `http://localhost:8000`.
- Cloud endpoint remains `https://api.ollama.ai` (do NOT change to localhost).

## 16.6 Switching to deepseek-v3.1:671b-cloud

Update any prior `OLLAMA_MODEL` references:
```
OLLAMA_MODEL=deepseek-v3.1:671b-cloud
```
If using the REST fallback client (`ai_client_cloud.py`), no additional change required beyond `.env`.

Model availability:
- Ensure your account/plan grants access to extremely large context / high parameter models like `deepseek-v3.1:671b-cloud`. If you receive 404 or permission errors, downgrade to a smaller supported model (e.g. `llama3.1:8b`).
- Large model responses can be slower and more costly—enable streaming endpoints to improve UX.

## 16.7 Test Calls

### Curl (Generate)
```
curl -X POST http://localhost:8000/ai/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explain tail recursion briefly."}'
```

### Curl (Chat)
```
curl -X POST http://localhost:8000/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"List three advantages of FastAPI."}]}'
```

### Curl (Streaming)
```
curl -N -X POST http://localhost:8000/ai/stream \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Stream a short description of Python generators."}'
```

# 4) Backend Environment Variables

Create a `.env` file (NOT committed) in `Project/backend/`:
```
OLLAMA_HOST=https://api.ollama.ai
OLLAMA_API_KEY=33b148ba9ae84examplekey179655
OLLAMA_MODEL=qwen3-coder:480b-cloud
```

Load it in FastAPI using `python-dotenv`.

Install additional packages:
```
cd Project/backend
.\venv\Scripts\Activate.ps1   # (Windows) OR source venv/bin/activate (Linux)
pip install ollama python-dotenv
```


# 5) Create an Ollama Client Module

File: `Project/backend/ai_client.py`
```python
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
```

## 6) Add Router Streaming & Non-Streaming to `router.py`

Add File: `Project/backend/router.py`

```python 
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
    
```


## 7) Add AI Endpoints to `main.py`

Edit `Project/backend/main.py` (append near bottom):

```python
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
```

Restart the backend:
```
python main.py
```

Check endpoints:
- POST http://127.0.0.1:8000/ai/generate  body: {"prompt": "Hello AI!"}
- POST http://127.0.0.1:8000/ai/chat      body: {"messages":[{"role":"user","content":"Explain FastAPI briefly."}]}

---

# Wait for a fix to 502 BAD Gateway.......

---


## 8) Update Frontend API Helper

(Already shown earlier in `rest.js`.)

## 9) Create a Simple AI Playground Page

File: `Project_01/forge/src/pages/AiPlayground.jsx`

```jsx
import { useState } from "react";
import s from "../styles/ai-playground.module.scss";
import { api } from "../utils/rest";

export default function AiPlayground() {
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleGenerate(e) {
    e.preventDefault();
    setError("");
    setAnswer("");
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setLoading(true);
    try {
      const data = await api.aiGenerate(trimmed);
      if (data?.error) {
        setError(data.error);
      } else {
        setAnswer(data?.response ?? "");
      }
    } catch (err) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={s.page} aria-labelledby="ai-playground-title">
      <div className={s.container}>
        <header className={s.header}>
          <h1 id="ai-playground-title" className={s.title}>AI Playground</h1>
          <p className={s.lead}>Send a prompt to the Ollama Cloud model through your FastAPI backend.</p>
        </header>

        <form className={s.form} onSubmit={handleGenerate}>
          <label htmlFor="prompt" className={s.label}>Prompt</label>
          <textarea
            id="prompt"
            className={s.textarea}
            rows={6}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a prompt for the model..."
            aria-label="Prompt"
          />

          <div className={s.controls}>
            <button
              type="submit"
              className={`${s.btn} ${s.primary}`}
              disabled={loading}
              aria-disabled={loading}
            >
              {loading ? "Thinking..." : "Generate"}
            </button>
            <button
              type="button"
              className={s.btn}
              onClick={() => { setPrompt(""); setAnswer(""); setError(""); }}
            >
              Clear
            </button>
          </div>
        </form>

        {error && <div role="alert" className={s.error}>Error: {error}</div>}

        {answer && (
          <section className={s.outputCard} aria-live="polite">
            <h2 className={s.outputTitle}>Response</h2>
            <div className={s.output}>{answer}</div>
          </section>
        )}
      </div>
    </main>
  );
}
```

## 10) Create a Simple AI Playground Style

File: `Project/frontend/src/styles/aiPlayground.module.scss`

```scss

$page-bg: #0f1226;
$text: rgba(255,255,255,0.92);
$text-dim: rgba(255,255,255,0.7);
$panel: rgba(255,255,255,0.04);
$border: rgba(255,255,255,0.10);
$muted: rgba(255,255,255,0.6);
$accent: #7c3aed; 
$accent-2: #06b6d4;

.page {
  min-height: 100vh;
  color: $text;
  background:
    radial-gradient(700px 350px at 14% 14%, rgba(88,63,201,0.18), transparent 50%),
    radial-gradient(600px 300px at 86% 84%, rgba(19,172,184,0.12), transparent 50%),
    $page-bg;
  padding-bottom: 80px;
}

.container {
  width: min(980px, 92%);
  margin: 0 auto;
  padding: clamp(20px, 4vw, 40px) 0;
}

/* header */
.header {
  margin-bottom: 18px;
}
.title {
  font-size: clamp(20px, 2.4vw, 28px);
  font-weight: 700;
  letter-spacing: 0.2px;
}
.lead {
  margin-top: 6px;
  color: $text-dim;
  font-size: 14px;
}

/* form */
.form {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.label {
  font-size: 13px;
  color: $text-dim;
}

/* shared card/base */
.cardBase {
  background: $panel;
  border: 1px solid $border;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.35);
  backdrop-filter: blur(6px);
}

/* textarea */
.textarea {
  @extend .cardBase;
  min-height: 120px;
  padding: 12px 14px;
  resize: vertical;
  color: $text;
  font-family: inherit;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.06);
  font-size: 14px;
  outline: none;
}
.textarea:focus {
  box-shadow: 0 6px 18px rgba(99,102,241,0.12);
  border-color: rgba($accent, 0.55);
}

/* controls */
.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

/* buttons */
.btn {
  @extend .cardBase;
  padding: 9px 14px;
  border-radius: 10px;
  background: transparent;
  color: $text;
  border: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  transition: transform .08s ease, box-shadow .12s ease, opacity .12s ease;
}
.btn:hover { transform: translateY(-2px); }
.btn:active { transform: translateY(0); }

.primary {
  background: linear-gradient(180deg, rgba(124,58,237,0.95), rgba(99,102,241,0.95));
  color: #fff;
  border: none;
  box-shadow: 0 10px 30px rgba(99,102,241,0.14);
}
.btn[disabled],
.btn[aria-disabled="true"] {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* error */
.error {
  margin-top: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(239,68,68,0.06);
  border: 1px solid rgba(239,68,68,0.12);
  color: #ffb4b4;
  font-size: 14px;
}

/* output card */
.outputCard {
  margin-top: 16px;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.06);
  background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  box-shadow: 0 8px 24px rgba(0,0,0,0.34);
}
.outputTitle {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: $text-dim;
}
.output {
  white-space: pre-wrap;
  line-height: 1.6;
  color: $text;
  font-size: 15px;
  padding: 6px 0;
}

/* small responsive tweaks */
@media (max-width: 640px) {
  .controls { flex-direction: column; align-items: stretch; }
  .btn { width: 100%; text-align: center; }
}

```


## 11) Add Route

Edit `Project/frontend/src/App.jsx`:
```jsx
import AiPlayground from './pages/AiPlayground';
<Route path="/ai" element={<AiPlayground />} />
```

Navigate to: http://localhost:5173/ai


---
