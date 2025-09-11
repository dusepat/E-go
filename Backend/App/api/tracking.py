# tracking endpoints

# backend/app/api/tracking.py
from fastapi import APIRouter

router = APIRouter(prefix="/tracking", tags=["tracking"])

@router.get("/{ride_code}")
def track_ride(ride_code: str):
    return {"message": f"Tracking info for ride {ride_code}"}
