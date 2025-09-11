
import os
from dotenv import load_dotenv

# Load environment variables from a .env file (optional but recommended)
load_dotenv()

# Default database settings (can be overridden by .env)
DATABASE_USER = os.getenv("DATABASE_USER", "ego_user")
DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD", "strongpassword")
DATABASE_HOST = os.getenv("DATABASE_HOST", "localhost")
DATABASE_PORT = os.getenv("DATABASE_PORT", "5432")
DATABASE_NAME = os.getenv("DATABASE_NAME", "ego_db")

# SQLAlchemy Database URL
DATABASE_URL = (
    f"postgresql+psycopg2://{DATABASE_USER}:{DATABASE_PASSWORD}@"
    f"{DATABASE_HOST}:{DATABASE_PORT}/{DATABASE_NAME}"
)
