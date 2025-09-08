from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# ⚠️ Change username, password, host, dbname to your local setup
DATABASE_URL = "postgresql+psycopg2://postgres:Patience%40987!@localhost:5432/ego_db"

engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
