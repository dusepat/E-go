# ride search, seat allocation

# backend/app/api/rides.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db

router = APIRouter(prefix="/rides", tags=["rides"])

@router.get("/search")
def search_rides(db: Session = Depends(get_db)):
    return {"message": "Search rides with filters"}

@router.get("/{ride_id}")
def get_ride(ride_id: int, db: Session = Depends(get_db)):
    return {"message": f"Get ride {ride_id}"}
