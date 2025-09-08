from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas, crud
from database import SessionLocal, engine

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-go API with PostgreSQL")

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="E-go API with PostgreSQL")

# Add this after creating the app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -------- Passengers --------
@app.post("/passengers", response_model=schemas.PassengerOut)
def add_passenger(passenger: schemas.PassengerCreate, db: Session = Depends(get_db)):
    return crud.create_passenger(db, passenger)

@app.get("/passengers", response_model=list[schemas.PassengerOut])
def list_passengers(db: Session = Depends(get_db)):
    return crud.get_passengers(db)

@app.put("/passengers/{passenger_id}", response_model=schemas.PassengerOut)
def update_passenger(passenger_id: int, passenger: schemas.PassengerCreate, db: Session = Depends(get_db)):
    return crud.update_passenger(db, passenger_id, passenger)

# -------- Bookings --------
@app.post("/bookings", response_model=schemas.BookingOut)
def add_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return crud.create_booking(db, booking)

@app.get("/bookings", response_model=list[schemas.BookingOut])
def list_bookings(db: Session = Depends(get_db)):
    return crud.get_bookings(db)

@app.put("/bookings/{booking_id}", response_model=schemas.BookingOut)
def update_booking(booking_id: int, booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    return crud.update_booking(db, booking_id, booking)

# -------- Payments --------
@app.post("/payments", response_model=schemas.PaymentOut)
def add_payment(payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    return crud.create_payment(db, payment)

@app.get("/payments", response_model=list[schemas.PaymentOut])
def list_payments(db: Session = Depends(get_db)):
    return crud.get_payments(db)

@app.put("/payments/{payment_id}", response_model=schemas.PaymentOut)
def update_payment(payment_id: int, payment: schemas.PaymentCreate, db: Session = Depends(get_db)):
    return crud.update_payment(db, payment_id, payment)

# -------- Vendors --------
@app.post("/vendors", response_model=schemas.VendorOut)
def add_vendor(vendor: schemas.VendorCreate, db: Session = Depends(get_db)):
    return crud.create_vendor(db, vendor)

@app.get("/vendors", response_model=list[schemas.VendorOut])
def list_vendors(db: Session = Depends(get_db)):
    return crud.get_vendors(db)
