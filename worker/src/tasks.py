import os
from twilio.rest import Client
from src.client import app

# ================================
# Tasks
# ================================

def get_twilio_client():
    """Initialize Twilio client with credentials from environment variables"""
    account_sid = os.getenv('TWILIO_ACCOUNT_SID')
    auth_token = os.getenv('TWILIO_AUTH_TOKEN')
    
    if not account_sid or not auth_token:
        raise ValueError("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be set in environment variables")
    
    return Client(account_sid, auth_token)

@app.task(name="gitremind.tasks.send_reminder")
def send_reminder(user_id: str, phone_number: str, message: str = None):
    """
    Send SMS reminder via Twilio
    
    Args:
        user_id: Identifier for the user
        phone_number: Phone number to send SMS to (format: +1234567890)
        message: Custom message to send (optional)
    """
    try:
        client = get_twilio_client()
        from_number = os.getenv('TWILIO_PHONE_NUMBER')
        
        if not from_number:
            raise ValueError("TWILIO_PHONE_NUMBER must be set in environment variables")
        
        # Use custom message or default
        sms_message = message or f"Reminder for user {user_id}: Don't forget to check your tasks!"
        
        # Send SMS
        message_obj = client.messages.create(
            body=sms_message,
            from_=from_number,
            to=phone_number
        )
        
        result = {
            "status": "success",
            "user_id": user_id,
            "phone_number": phone_number,
            "message_sid": message_obj.sid,
            "message": sms_message
        }
        
        print(f"SMS sent successfully: {result}")
        return result
        
    except Exception as e:
        error_result = {
            "status": "error",
            "user_id": user_id,
            "error": str(e)
        }
        print(f"Failed to send SMS: {error_result}")
        return error_result
