from .passengers import router as passengers_router
# ... import other routers ...

from fastapi import APIRouter
api_router = APIRouter()
api_router.include_router(passengers_router)
# ... include other routers ...