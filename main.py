from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Dict

app = FastAPI(title="E-go API", version="1.2")

from fastapi.middleware.cors import CORSMiddleware

# allow frontend to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # in production: set only your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- Mock Data Stores ----------------
passengers: List[Dict] = []
bookings: List[Dict] = []
payments: List[Dict] = []
vendors: List[Dict] = [
    {"id": 301, "name": "Snack Bar Kigali", "service": "Snacks"},
    {"id": 302, "name": "Café Huye", "service": "Meals"},
]

# ---------------- Data Models ----------------
class Passenger(BaseModel):
    name: str
    email: EmailStr

class Booking(BaseModel):
    passenger_id: int
    route: str
    seat: str

class Payment(BaseModel):
    booking_id: int
    amount: float
    status: str

# ---------------- Helper ----------------
def generate_id(data: List[Dict]) -> int:
    return len(data) + 1

# ---------------- Root ----------------
@app.get("/")
def root():
    return {"message": "Welcome to E-go API 🚍"}

# ---------------- Passengers ----------------
@app.get("/passengers")
def list_passengers() -> List[Dict]:
    return passengers

@app.post("/passengers")
def create_passenger(passenger: Passenger):
    for p in passengers:
        if p["email"] == passenger.email:
            raise HTTPException(status_code=400, detail="Email already exists")
    new_passenger = passenger.dict()
    new_passenger["id"] = generate_id(passengers)
    passengers.append(new_passenger)
    return {"status": "success", "data": new_passenger}

@app.put("/passengers/{passenger_id}")
def update_passenger(passenger_id: int, passenger: Passenger):
    for p in passengers:
        if p["id"] == passenger_id:
            p.update(passenger.dict())
            return {"status": "success", "data": p}
    raise HTTPException(status_code=404, detail="Passenger not found")

@app.delete("/passengers/{passenger_id}")
def delete_passenger(passenger_id: int):
    for p in passengers:
        if p["id"] == passenger_id:
            passengers.remove(p)
            return {"status": "success", "message": "Passenger deleted"}
    raise HTTPException(status_code=404, detail="Passenger not found")

# ---------------- Bookings ----------------
@app.get("/bookings")
def list_bookings() -> List[Dict]:
    return bookings

@app.post("/bookings")
def create_booking(booking: Booking):
    passenger = next((p for p in passengers if p["id"] == booking.passenger_id), None)
    if not passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")
    for b in bookings:
        if b["route"] == booking.route and b["seat"] == booking.seat:
            raise HTTPException(status_code=400, detail="Seat already booked on this route")
    new_booking = booking.dict()
    new_booking["id"] = generate_id(bookings)
    bookings.append(new_booking)
    return {"status": "success", "data": new_booking}

@app.put("/bookings/{booking_id}")
def update_booking(booking_id: int, booking: Booking):
    for b in bookings:
        if b["id"] == booking_id:
            b.update(booking.dict())
            return {"status": "success", "data": b}
    raise HTTPException(status_code=404, detail="Booking not found")

@app.delete("/bookings/{booking_id}")
def delete_booking(booking_id: int):
    for b in bookings:
        if b["id"] == booking_id:
            bookings.remove(b)
            return {"status": "success", "message": "Booking deleted"}
    raise HTTPException(status_code=404, detail="Booking not found")

# ---------------- Payments ----------------
@app.get("/payments")
def list_payments() -> List[Dict]:
    return payments

@app.post("/payments")
def create_payment(payment: Payment):
    booking = next((b for b in bookings if b["id"] == payment.booking_id), None)
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    new_payment = payment.dict()
    new_payment["id"] = generate_id(payments)
    payments.append(new_payment)
    return {"status": "success", "data": new_payment}

@app.put("/payments/{payment_id}")
def update_payment(payment_id: int, payment: Payment):
    for pay in payments:
        if pay["id"] == payment_id:
            pay.update(payment.dict())
            return {"status": "success", "data": pay}
    raise HTTPException(status_code=404, detail="Payment not found")

@app.delete("/payments/{payment_id}")
def delete_payment(payment_id: int):
    for pay in payments:
        if pay["id"] == payment_id:
            payments.remove(pay)
            return {"status": "success", "message": "Payment deleted"}
    raise HTTPException(status_code=404, detail="Payment not found")

# ---------------- Vendors (Read-only for now) ----------------
@app.get("/vendors")
def list_vendors() -> List[Dict]:
    return vendors
