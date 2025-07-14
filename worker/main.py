from celery import Celery
from dotenv import load_dotenv
import os

load_dotenv()

# Initialize Celery app
app = Celery(
    'worker',
    broker=os.getenv('REDIS_URL') + '/0',
    backend=os.getenv('REDIS_URL') + '/1'
)

@app.task(name="gitremind.tasks.send_reminder")
def send_reminder(user_id: str):
    """
    Simple task that prints a message
    """
    message = f"Reminder: {user_id}!"
    print(message)
    return message

if __name__ == '__main__':
    app.start()
