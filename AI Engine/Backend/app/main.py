import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError
from app.api.routes_auth import router as auth_router
from app.api.routes_health import router as health_router
from app.api.routes_users import router as users_router
from app.core.config import settings
from app.db.models import Base
from app.db.session import engine, SessionLocal
from app.services.users import seed_default_user

app = FastAPI(title="Shared Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    # Retry DB connection a few times
    for attempt in range(10):
        try:
            Base.metadata.create_all(bind=engine)
            db = SessionLocal()
            seed_default_user(
                db,
                settings.DEFAULT_USER_EMAIL,
                settings.DEFAULT_USER_PASSWORD,
                settings.DEFAULT_USER_ROLE,
            )
            db.close()
            return
        except OperationalError:
            time.sleep(2)
    # If it still fails after retries, let the error crash the app
    Base.metadata.create_all(bind=engine)

app.include_router(health_router)
app.include_router(auth_router, prefix="/auth", tags=["auth"])
app.include_router(users_router, prefix="/users", tags=["users"])