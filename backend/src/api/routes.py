from fastapi import APIRouter
from datetime import datetime, timedelta
from slowapi import Limiter
from slowapi.util import get_remote_address

from src.api.scheduler.tasks import send_reminder_task
from src.api.models.requests import ReminderRequest
from src.api.errors import reminder_task_exception 

# Create rate limiter
limiter = Limiter(key_func=get_remote_address)

# Create router
router = APIRouter()

#===============================================#
# Routes
#===============================================#

@router.get("/")
@limiter.limit("5/minute")
async def root():
    """Root endpoint to check if the API is running"""
    return {"message": "GitRemind API is running"}

@router.post("/reminder/add")
@limiter.limit("5/minute")
async def add_reminder(reminder_request: ReminderRequest):
    """Add a reminder task to the queue"""
    try: 
        return send_reminder_task(reminder_request.user_id, datetime.now() + timedelta(seconds=10)) 
    except Exception as e:
        raise reminder_task_exception(e)