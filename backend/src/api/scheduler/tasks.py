from datetime import datetime
from .client import celery_client

#===============================================#
# Tasks
#===============================================#

def send_reminder_task(user_id: str, eta: datetime):
    """Schedule a reminder task for a user"""
    return celery_client.send_task(
        "gitremind.tasks.send_reminder",
        args=[user_id],
        eta=eta
    )
