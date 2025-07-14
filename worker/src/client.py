from celery import Celery
from dotenv import load_dotenv
import os
import sys

load_dotenv()

# Get Redis URL with proper error handling
redis_url = os.getenv('REDIS_URL')

# Validate Redis URL
if not redis_url:
    print("Error: REDIS_URL environment variable is not set!")
    print("Please set REDIS_URL to your Redis connection string (e.g., redis://localhost:6379)")
    sys.exit(1)

# Initialize Celery app
app = Celery(
    'worker',
    broker=redis_url + '/0',
    backend=redis_url + '/1'
)

# Configure autodiscovery
app.conf.update(
    include=['src.tasks']
)

