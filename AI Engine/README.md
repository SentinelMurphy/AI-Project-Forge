# Shared FastAPI Backend (Docker + Postgres + JWT + Sessions)

This backend is designed to serve **multiple localhost frontends** through a single Docker container.  
It provides **JWT-based auth**, **session cookies**, **refresh tokens**, **CORS**, **role-based access**, and **default user seeding**.

---

## 📦 Project Structure

```
backend/
├─ app/
│  ├─ main.py
│  ├─ core/
│  │  ├─ config.py
│  │  ├─ security.py
│  │  └─ __init__.py
│  ├─ db/
│  │  ├─ session.py
│  │  ├─ models.py
│  │  └─ __init__.py
│  ├─ api/
│  │  ├─ routes_auth.py
│  │  ├─ routes_health.py
│  │  ├─ routes_users.py
│  │  └─ __init__.py
│  ├─ schemas/
│  │  ├─ user.py
│  │  ├─ token.py
│  │  └─ __init__.py
│  ├─ services/
│  │  ├─ users.py
│  │  └─ __init__.py
│  └─ __init__.py
├─ Dockerfile
├─ docker-compose.yml
├─ requirements.txt
├─ .env
```

---

# 🔍 What Each File Does

## Root files
### **Dockerfile**
- Defines the Python container for the FastAPI app and expose port.

### **docker-compose.yml**
- Runs **FastAPI + PostgreSQL** together with Docker.

### **requirements.txt**
- Lists Python packages needed.

### **.env**
- Environment configuration (database URL, JWT secrets, CORS origins, default user seed).

---

## App Entry
### **app/main.py**
- Creates the FastAPI app
- Enables CORS for multiple localhost frontends
- Registers all routes
- Creates DB tables at startup
- **Seeds a default user on startup if missing**

---

## Configuration & Security
### **app/core/config.py**
- Loads environment variables like DB connection, JWT secrets, CORS origins, and default user seed.

### **app/core/security.py**
Handles:
- Password hashing/verification
- Creating JWT access tokens
- Creating refresh tokens
- Decoding tokens

---

## Database
### **app/db/session.py**
- Creates the SQLAlchemy database connection.

### **app/db/models.py**
- Defines DB models (currently just the `User` model with roles).

---

## API Routes
### **app/api/routes_auth.py**
Auth endpoints:
- **POST /auth/signup**
- **POST /auth/login**
- **POST /auth/refresh**

Also sets session cookies.

### **app/api/routes_users.py**
Protected endpoints:
- **GET /users/me** (requires login)
- **GET /users/admin** (requires admin role)

### **app/api/routes_health.py**
Health check:
- **GET /health**

---

## Schemas
### **app/schemas/user.py**
- Pydantic models for signup/login data.

### **app/schemas/token.py**
- Pydantic models for access & refresh token responses.

---

## Services
### **app/services/users.py**
Low-level user logic:
- Create a user in DB
- Authenticate a user
- **Seed a default user if missing**

---

# ✅ Default User Seeding

On every startup, the app checks for a default user and creates it **only if it does not already exist**.

### Default seed values (edit in `.env`):
```
DEFAULT_USER_EMAIL=CoderDojo
DEFAULT_USER_PASSWORD=CoderDojo22
DEFAULT_USER_ROLE=admin
```

---

# ✅ Common Changes (Where to Edit)

### Want to change JWT expiration?
Edit `.env`:
```
JWT_EXPIRE_MINUTES=30
JWT_REFRESH_EXPIRE_DAYS=7
```

### Want to allow more frontends?
Edit `.env`:
```
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### Want to change the default seeded user?
Edit `.env`:
```
DEFAULT_USER_EMAIL=CoderDojo
DEFAULT_USER_PASSWORD=CoderDojo22
DEFAULT_USER_ROLE=admin
```

### Want to add new protected endpoints?
Create a new file in `app/api/` and include it in `main.py`.

### Want to add more DB models?
Add classes in `app/db/models.py`.

---

# 🚀 Run It

```bash
docker compose up --build
```

Backend will be available at:

- `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`

---

