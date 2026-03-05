from pydantic import BaseModel
import os

class Settings(BaseModel):
    DATABASE_URL: str = os.getenv("DATABASE_URL")
    JWT_SECRET: str = os.getenv("JWT_SECRET")
    JWT_EXPIRE_MINUTES: int = int(os.getenv("JWT_EXPIRE_MINUTES", "30"))
    JWT_REFRESH_SECRET: str = os.getenv("JWT_REFRESH_SECRET")
    JWT_REFRESH_EXPIRE_DAYS: int = int(os.getenv("JWT_REFRESH_EXPIRE_DAYS", "7"))
    CORS_ORIGINS: list[str] = os.getenv("CORS_ORIGINS", "").split(",")

    DEFAULT_USER_EMAIL: str = os.getenv("DEFAULT_USER_EMAIL", "CoderDojo")
    DEFAULT_USER_PASSWORD: str = os.getenv("DEFAULT_USER_PASSWORD", "CoderDojo22")
    DEFAULT_USER_ROLE: str = os.getenv("DEFAULT_USER_ROLE", "admin")

settings = Settings()