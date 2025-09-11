from fastapi import FastAPI
from app.core.db import init_db
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, bookings, payments, rides, tracking
from app.core.db import init_db

# Initialize app
app = FastAPI(
    title="E-go Passenger Platform",
    description="Digital intercity bus booking, payments, and tracking system for Rwanda",
    version="1.0.0",
)

# Middleware (CORS for web & mobile clients)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup event (DB, services, etc.)
@app.on_event("startup")
async def startup_event():
    await init_db()
    print("✅ E-go API started and DB initialized")

# Health check endpoint
@app.get("/health", tags=["System"])
async def health_check():
    return {"status": "ok", "message": "E-go backend running"}

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["Authentication"])
app.include_router(bookings.router, prefix="/bookings", tags=["Bookings"])
app.include_router(payments.router, prefix="/payments", tags=["Payments"])
app.include_router(rides.router, prefix="/rides", tags=["Rides"])
app.include_router(tracking.router, prefix="/tracking", tags=["Tracking"])

@app.on_event("startup")
async def startup_event():
    await init_db()