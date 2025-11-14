# Add a Python FastAPI Backend to a Vite React App

Goal: Add a simple Python FastAPI backend under `Project/backend`, return fake data, and call it from your existing Vite React UI under `Project_01/forge`.

Repository folders this applies to:
- UI: [Project/forge](https://github.com/SentinelMurphy/AI-Project-Forge/tree/main/Project_01/forge)
- Backend (you will create): `Project/backend`

---

## Why add a backend?

- Single source of truth: Put data and business logic on the server, not in the UI.
- Clear contracts: Your React app calls well-defined REST endpoints and gets JSON back.
- Security and scaling: Keep secrets on the server, scale backend separately from the UI.
- CORS-friendly dev: Run UI and API on different ports safely during development.
- Future-ready: Start with fake data, later swap in a database or external APIs with minimal UI changes.

---

## Tools we use (and why)

- Python 3 + venv: Python runtime and an isolated environment for backend packages.
- FastAPI: Modern Python web framework with automatic validation and interactive docs at `/docs`.
- Uvicorn: ASGI server to run FastAPI efficiently in development.
- CORS Middleware: Allows the browser (Vite dev server) to call your API during dev.
- Node.js + Vite (already in use): Build and serve your React UI.

---

## Final layout (after this guide)

```
Project/
  backend/
    venv/                 # Python virtual environment (local)
    main.py               # FastAPI app
    requirements.txt      # Optional, pinned versions
  forge/                  # existing Vite React app (UI)
    src/
      utils/
        rest.js           # Minimal API helper for React
    ... (existing files)
```

Backend runs at http://127.0.0.1:8000  
Vite dev server runs at http://localhost:5173

---

## 1) Prerequisites

- Python 3.9+ installed
- Node.js installed (already used by your Vite app)
- Terminal/PowerShell access

Windows (PowerShell) note: if activation is blocked, run as Administrator once:
```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

What & Why:
- Python runs the backend; Node powers the UI tooling.
- The execution policy change allows the venv activation script to run on Windows.

---

## 2) Create the backend folder

From the repository root:

Windows (PowerShell):
```
cd Project
mkdir backend
```

Linux (bash):
```
cd Project
mkdir -p backend
```

What & Why:
- Keeps backend code separate from the Vite app for clean tooling and deployment.

---

## 3) Create and activate a Python venv, install FastAPI

Windows (PowerShell):
```
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install fastapi uvicorn[standard] python-multipart
pip freeze > requirements.txt
```

Linux (bash):
```
cd backend
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install fastapi uvicorn[standard] python-multipart
pip freeze > requirements.txt
```

What & Why:
- `venv` isolates dependencies to this project.
- `fastapi` is the framework; `uvicorn` is the server; `python-multipart` supports forms/files later if needed.

---

## 4) Create the FastAPI app with fake data and CORS

Create `Project/backend/main.py`:

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List, Dict

app = FastAPI(
    title="Project FastAPI Backend",
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
    {"id": 1, "name": "Chris Widget", "price": 49.99, "in_stock": True},
    {"id": 2, "name": "Aishling Gadget", "price": 29.5, "in_stock": False},
    {"id": 3, "name": "Sami Tool", "price": 9.75, "in_stock": True},
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
```

What & Why:
- `/items` and `/items/{id}` return fake JSON that your UI can call right away.
- CORS middleware lets the Vite dev server (different port) call your API from the browser.

---

## 5) Run the FastAPI server

With the venv active and inside `Project/backend`:

Windows or Linux:
```
uvicorn main:app --reload --port 8000
```

Open:
- Docs: http://127.0.0.1:8000/docs
- Items: http://127.0.0.1:8000/items

What & Why:
- `--reload` restarts on file changes for fast iteration.
- `/docs` is an interactive Swagger UI for quick testing.

---

## 6) Add a minimal API helper in the Vite app

Create `Project/forge/src/utils/rest.js`:

```javascript
const API_BASE = "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Request failed (${resp.status}): ${text}`);
  }
  return resp.json();
}

export const api = {
  health: () => request("/health"),
  getItems: () => request("/items"),
  getItem: (id) => request(`/items/${id}`),
};

export default api;
```

What & Why:
- Centralizes fetch logic and error handling in one place.
- UI components can import `api` and stay clean and focused on rendering.

---

# 7) New UI Page: Cards showing FastAPI item count

This section adds a new page at `/items` that:
- Shows a summary card with the total number of items returned by the FastAPI `/items` endpoint.
- Displays a grid of item cards.

Make sure your backend is running at http://127.0.0.1:8000 and CORS is configured to allow `http://localhost:5173` (and `http://127.0.0.1:5173`).

1) Update routing to include the new page

Edit `Project_01/forge/src/App.jsx` to add the route (keep your existing routes):

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Items from './pages/Items';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Items />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
```

2) Ensure the API helper exists

File: `Project_01/forge/src/utils/rest.js` (from earlier steps)
```javascript
const API_BASE = "http://127.0.0.1:8000";

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`Request failed (${resp.status}): ${text}`);
  }
  return resp.json();
}

export const api = {
  health: () => request("/health"),
  getItems: () => request("/items"),
  getItem: (id) => request(`/items/${id}`),
};

export default api;
```

3) Add the new Items page

Create `Project_01/forge/src/pages/Items.jsx`:

```jsx
import { useEffect, useState } from "react";
import { api } from "../utils/rest";

export default function Items() {
  const [status, setStatus] = useState("Loading items...");
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getItems()
      .then((data) => {
        const list = data?.items ?? [];
        setItems(list);
        setCount(data?.count ?? list.length);
        setStatus("OK");
      })
      .catch((e) => {
        setError(e.message || "Failed to load items");
        setStatus("Error");
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Items (FastAPI)</h1>
          <p className="text-sm text-gray-600">
            Status: {status} {error && <span className="text-red-600">— {error}</span>}
          </p>
        </header>

        {/* Summary card */}
        <section className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-lg border bg-white shadow-sm p-5">
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-3xl font-bold">{count}</p>
            </div>
          </div>
        </section>

        {/* Item cards */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {items.map((i) => (
              <div
                key={i.id}
                className="rounded-lg border bg-white shadow-sm p-5 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">{i.name}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      i.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {i.in_stock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className="text-sm text-gray-600">ID: {i.id}</div>
                <div className="text-xl font-semibold">${i.price}</div>
              </div>
            ))}
          </div>

          {items.length === 0 && !error && (
            <p className="text-gray-600 mt-4">No items to display.</p>
          )}
        </section>
      </div>
    </div>
  );
}
```

4) Run and view

- Start backend:
  ```
  cd Project_01/backend
  # activate venv
  uvicorn main:app --reload --port 8000
  ```
- Start UI:
  ```
  cd Project_01/forge
  npm run dev
  ```
- Open http://localhost:5173/items to see the cards.

---

# 8) Update Items with className Styles module

Update `Project/forge/src/pages/Items.jsx`:

```jsx
import { useEffect, useState } from "react";
import s from "../styles/items.module.scss";
import { api } from "../utils/rest";

export default function Items() {
  const [status, setStatus] = useState("Loading items...");
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getItems()
      .then((data) => {
        const list = data?.items ?? [];
        setItems(list);
        setCount(data?.count ?? list.length);
        setStatus("OK");
      })
      .catch((e) => {
        setError(e.message || "Failed to load items");
        setStatus("Error");
      });
  }, []);

  return (
    <div className={s.page}>
      <div className={s.container}>
        <header className={s.header}>
          <h1 className={s.title}>Items (FastAPI)</h1>
          <p className={s.subtle}>
            Status: {status} {error && <span className={s.error}>— {error}</span>}
          </p>
        </header>

        {/* Summary metric */}
        <section className={s.section}>
          <div className={s.metricsGrid}>
            <div className={s.metricCard}>
              <p className={s.metricLabel}>Total Items</p>
              <p className={s.metricValue}>{count}</p>
            </div>
          </div>
        </section>

        {/* Item cards */}
        <section className={s.section}>
          <div className={s.grid}>
            {items.map((i) => (
              <div key={i.id} className={s.itemCard}>
                <div className={s.itemHeader}>
                  <h2 className={s.itemName}>{i.name}</h2>
                  <span className={`${s.badge} ${i.in_stock ? s.badgeIn : s.badgeOut}`}>
                    {i.in_stock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
                <div className={s.itemMeta}>ID: {i.id}</div>
                <div className={s.price}>${i.price}</div>
              </div>
            ))}
          </div>

          {items.length === 0 && !error && (
            <p className={s.subtle}>No items to display.</p>
          )}
        </section>
      </div>
    </div>
  );
}
```

# 9) Styles module (items.module.scss)

Create `Project/forge/src/styles/items.module.scss`:

```scss

$page-bg: #0f1226; /* deep navy */
$text: rgba(255,255,255,0.9);
$text-dim: rgba(255,255,255,0.7);
$border: rgba(255,255,255,0.14);
$card: rgba(255,255,255,0.06);
$shadow: 0 1px 0 rgba(255,255,255,0.04) inset, 0 10px 30px rgba(0,0,0,0.35);

$success-bg: rgba(16, 185, 129, 0.15); /* green-500 at low opacity */
$success-fg: #10b981;
$danger-bg: rgba(239, 68, 68, 0.15);   /* red-500 at low opacity */
$danger-fg: #ef4444;

.page {
  min-height: 100vh;
  color: $text;
  background:
    radial-gradient(800px 400px at 12% 18%, rgba(88, 63, 201, 0.25), transparent 60%),
    radial-gradient(700px 350px at 88% 82%, rgba(19, 172, 184, 0.18), transparent 60%),
    $page-bg;
}

.container {
  width: min(1100px, 92%);
  margin-inline: auto;
  padding: clamp(20px, 4vw, 40px) 0;
}

.header {
  margin-bottom: 18px;
}

.title {
  font-size: clamp(20px, 2vw, 26px);
  font-weight: 700;
  letter-spacing: 0.2px;
}

.subtle {
  margin-top: 4px;
  color: $text-dim;
  font-size: 14px;
}

.error {
  color: $danger-fg;
}

.section {
  margin-top: 22px;
}

/* Shared card base */
.cardBase {
  background: $card;
  border: 1px solid $border;
  border-radius: 12px;
  box-shadow: $shadow;
  backdrop-filter: blur(6px);
}

/* Metrics layout */
.metricsGrid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 16px;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 960px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.metricCard {
  @extend .cardBase;
  padding: 18px 20px;
}

.metricLabel {
  color: $text-dim;
  font-size: 14px;
}

.metricValue {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.1;
  margin-top: 6px;
}

/* Items grid */
.grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 960px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.itemCard {
  @extend .cardBase;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.itemHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.itemName {
  font-size: 16px;
  font-weight: 600;
}

.itemMeta {
  color: $text-dim;
  font-size: 14px;
}

.price {
  font-size: 20px;
  font-weight: 800;
}

/* Badges */
.badge {
  border-radius: 8px;
  font-size: 12px;
  padding: 4px 8px;
  border: 1px solid transparent;
  user-select: none;
  white-space: nowrap;
}

.badgeIn {
  background: $success-bg;
  color: $success-fg;
  border-color: rgba(16, 185, 129, 0.35);
}

.badgeOut {
  background: $danger-bg;
  color: $danger-fg;
  border-color: rgba(239, 68, 68, 0.35);
}
```
