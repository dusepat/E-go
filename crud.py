from sqlalchemy.orm import Session
import models, schemas

# -------- Passengers --------
def create_passenger(db: Session, passenger: schemas.PassengerCreate):
    db_passenger = models.Passenger(**passenger.dict())
    db.add(db_passenger)
    db.commit()
    db.refresh(db_passenger)
    return db_passenger

def get_passengers(db: Session):
    return db.query(models.Passenger).all()

def update_passenger(db: Session, passenger_id: int, passenger: schemas.PassengerCreate):
    db_passenger = db.query(models.Passenger).filter(models.Passenger.id == passenger_id).first()
    if not db_passenger:
        return None
    db_passenger.name = passenger.name
    db_passenger.email = passenger.email
    db.commit()
    db.refresh(db_passenger)
    return db_passenger

# -------- Bookings --------
def create_booking(db: Session, booking: schemas.BookingCreate):
    db_booking = models.Booking(**booking.dict())
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_bookings(db: Session):
    return db.query(models.Booking).all()

def update_booking(db: Session, booking_id: int, booking: schemas.BookingCreate):
    db_booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not db_booking:
        return None
    db_booking.passenger_id = booking.passenger_id
    db_booking.route = booking.route
    db_booking.seat = booking.seat
    db.commit()
    db.refresh(db_booking)
    return db_booking

# -------- Payments --------
def create_payment(db: Session, payment: schemas.PaymentCreate):
    db_payment = models.Payment(**payment.dict())
    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)
    return db_payment

def get_payments(db: Session):
    return db.query(models.Payment).all()

def update_payment(db: Session, payment_id: int, payment: schemas.PaymentCreate):
    db_payment = db.query(models.Payment).filter(models.Payment.id == payment_id).first()
    if not db_payment:
        return None
    db_payment.booking_id = payment.booking_id
    db_payment.amount = payment.amount
    db_payment.status = payment.status
    db.commit()
    db.refresh(db_payment)
    return db_payment

# -------- Vendors --------
def create_vendor(db: Session, vendor: schemas.VendorCreate):
    db_vendor = models.Vendor(**vendor.dict())
    db.add(db_vendor)
    db.commit()
    db.refresh(db_vendor)
    return db_vendor

def get_vendors(db: Session):
    return db.query(models.Vendor).all()
