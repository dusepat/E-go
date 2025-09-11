# payment integration

# backend/app/api/payments.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db

router = APIRouter(prefix="/payments", tags=["payments"])

@router.post("/")
def initiate_payment(db: Session = Depends(get_db)):
    return {"message": "Initiate payment"}

@router.get("/{payment_id}")
def check_payment_status(payment_id: int, db: Session = Depends(get_db)):
    return {"message": f"Check payment {payment_id}"}
