from fastapi import Depends
from sqlalchemy.orm import Session
from app.core.db import get_db

@router.get("/bookings")
def list_bookings(db: Session = Depends(get_db)):
    return db.query(Booking).all()
