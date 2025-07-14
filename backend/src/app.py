from fastapi import APIRouter
from datetime import datetime, timedelta

from src.api.scheduler.tasks import send_reminder_task
from src.api.models.requests import ReminderRequest

router = APIRouter()

#===============================================#
# Routes
#===============================================#

@router.get("/")
async def root():
    """Root endpoint to check if the API is running"""
    return {"message": "GitRemind API is running"}

@router.post("/reminder/add")
async def add_reminder(request: ReminderRequest):
    """Add a reminder task to the queue"""
    return send_reminder_task(request.user_id, datetime.now() + timedelta(seconds=10))