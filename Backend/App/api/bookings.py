# booking CRUD

# backend/app/api/bookings.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db

router = APIRouter(prefix="/bookings", tags=["bookings"])

@router.post("/")
def create_booking(db: Session = Depends(get_db)):
    return {"message": "Create a booking"}

@router.get("/{booking_id}")
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    return {"message": f"Get booking {booking_id}"}

@router.put("/{booking_id}")
def update_booking(booking_id: int, db: Session = Depends(get_db)):
    return {"message": f"Update booking {booking_id}"}

@router.delete("/{booking_id}")
def delete_booking(booking_id: int, db: Session = Depends(get_db)):
    return {"message": f"Delete booking {booking_id}"}
