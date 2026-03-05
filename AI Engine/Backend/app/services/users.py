from sqlalchemy.orm import Session
from app.db.models import User
from app.core.security import hash_password, verify_password

def create_user(db: Session, email: str, password: str, role: str = "user"):
    user = User(email=email, hashed_password=hash_password(password), role=role)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def authenticate_user(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        return None
    if not verify_password(password, user.hashed_password):
        return None
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def seed_default_user(db: Session, email: str, password: str, role: str):
    existing = get_user_by_email(db, email)
    if existing:
        return existing
    return create_user(db, email, password, role)