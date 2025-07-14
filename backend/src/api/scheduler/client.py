from celery import Celery
import os
from dotenv import load_dotenv

load_dotenv()

#===============================================#
# Celery client
#===============================================#

celery_client = Celery(
    "gitremind", 
    broker=os.getenv("REDIS_URL") + "/0",
    backend=os.getenv("REDIS_URL") + "/1",
)

celery_client.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
    timezone="UTC",
    enable_utc=True,
)