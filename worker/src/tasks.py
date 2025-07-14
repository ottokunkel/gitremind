import os
from src.client import app

# ================================
# Tasks
# ================================

@app.task(name="gitremind.tasks.send_reminder")
def send_reminder(user_id: str):
    """
    Send reminder message (currently just prints to console)
    
    Args:
        user_id: Identifier for the user
    """
    try:
        message = os.getenv('MESSAGE') or f"Reminder for user {user_id}: Don't forget to check your tasks!"
        
        # Simple print for now
        print(f"📱 Reminder sent to user {user_id}: {message}")
        
        result = {
            "status": "success",
            "user_id": user_id,
            "message": message
        }
        
        return result
        
    except Exception as e:
        error_result = {
            "status": "error",
            "user_id": user_id,
            "error": str(e)
        }
        print(f"Failed to send reminder: {error_result}")
        return error_result
