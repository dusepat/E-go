from pydantic import BaseModel, EmailStr
from typing import Optional

class PassengerCreate(BaseModel):
    name: str
    email: EmailStr

class PassengerOut(PassengerCreate):
    id: int
    class Config:
        orm_mode = True

class BookingCreate(BaseModel):
    passenger_id: int
    route: str
    seat: str

class BookingOut(BookingCreate):
    id: int
    class Config:
        orm_mode = True

class PaymentCreate(BaseModel):
    booking_id: int
    amount: float
    status: str

class PaymentOut(PaymentCreate):
    id: int
    class Config:
        orm_mode = True

class VendorCreate(BaseModel):
    name: str
    service: str

class VendorOut(VendorCreate):
    id: int
    class Config:
        orm_mode = True
