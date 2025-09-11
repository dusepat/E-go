# signup/signin

# backend/app/api/auth.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup")
def signup_user(db: Session = Depends(get_db)):
    return {"message": "User signup endpoint"}

@router.post("/login")
def login_user(db: Session = Depends(get_db)):
    return {"message": "User login endpoint"}

@router.get("/me")
def get_current_user():
    return {"message": "Return current logged-in user"}
