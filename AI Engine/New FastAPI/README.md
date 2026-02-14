## FastAPI Example API

This is a minimal CRUD API built with **FastAPI**.

### Install dependencies

```bash
cd "Fast API"
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### Run the server

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`.

- **Interactive docs (Swagger UI)**: `http://127.0.0.1:8000/docs`
- **Alternative docs (ReDoc)**: `http://127.0.0.1:8000/redoc`

### Available endpoints

- **GET** `/health` – simple health check
- **POST** `/items` – create an item
- **GET** `/items` – list all items
- **GET** `/items/{item_id}` – get a single item
- **PUT** `/items/{item_id}` – update an item
- **DELETE** `/items/{item_id}` – delete an item

