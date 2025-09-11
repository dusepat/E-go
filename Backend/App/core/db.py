# DB session, engine

# backend/app/core/db.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from app.config import DATABASE_URL


# Database URL (PostgreSQL)
# Example: postgresql://username:password@localhost:5432/ego_db
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:password@localhost:5432/ego_db"
)

# SQLAlchemy setup
engine = create_engine(DATABASE_URL, future=True, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency for routes (DB session per request)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Called on app startup
async def init_db():
    from app.models import user, booking, ride, payment, service
    Base.metadata.create_all(bind=engine)
    print("✅ Database tables created")
