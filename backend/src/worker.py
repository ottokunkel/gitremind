from celery import Celery
from dotenv import load_dotenv
import os
from .services.reminder import reminder_service

load_dotenv()

celery = Celery(
    'reminder',
    broker=os.getenv('REDIS_URL') + '/0',       
    backend=os.getenv('REDIS_URL') + '/1'       
)

celery.conf.enable_utc = True
celery.conf.timezone  = 'UTC'


@celery.task
def send_reminder(user_id: str):
    """
    Celery task to send a reminder to a user
    
    Args:
        user_id: The ID of the user to send reminder to
        
    Returns:
        str: Success message
    """
    return reminder_service.send_reminder(user_id) 