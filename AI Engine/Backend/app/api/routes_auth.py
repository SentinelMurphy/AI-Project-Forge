from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.schemas.user import UserCreate
from app.schemas.token import TokenResponse, RefreshRequest
from app.services.users import create_user, authenticate_user
from app.core.security import create_access_token, create_refresh_token, decode_refresh_token

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(payload: UserCreate, db: Session = Depends(get_db)):
    user = create_user(db, payload.email, payload.password)
    return {"id": user.id, "email": user.email, "role": user.role}

@router.post("/login", response_model=TokenResponse)
def login(payload: UserCreate, response: Response, db: Session = Depends(get_db)):
    user = authenticate_user(db, payload.email, payload.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(sub=str(user.id), role=user.role)
    refresh_token = create_refresh_token(sub=str(user.id))

    response.set_cookie(
        key="session_token",
        value=access_token,
        httponly=True,
        samesite="lax",
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="lax",
    )

    return {"access_token": access_token, "refresh_token": refresh_token}

@router.post("/refresh", response_model=TokenResponse)
def refresh(payload: RefreshRequest, response: Response):
    data = decode_refresh_token(payload.refresh_token)
    if data.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    access_token = create_access_token(sub=data["sub"], role="user")
    refresh_token = create_refresh_token(sub=data["sub"])

    response.set_cookie(
        key="session_token",
        value=access_token,
        httponly=True,
        samesite="lax",
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        samesite="lax",
    )

    return {"access_token": access_token, "refresh_token": refresh_token}