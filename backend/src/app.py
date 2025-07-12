from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from .worker import celery, send_reminder
from .services.reminder import reminder_service
import os
import uvicorn

app = FastAPI(title="GitRemind API", description="API for managing reminders")

class ReminderRequest(BaseModel):
    user_id: str

@app.get("/")
async def root():
    return {"message": "GitRemind API is running"}

@app.post("/reminder/add")
async def add_reminder(request: ReminderRequest):
    """Add a reminder task to the queue"""
    
    # Validate user_id
    if not reminder_service.validate_user_id(request.user_id):
        raise HTTPException(status_code=400, detail="Invalid user_id")
    
    try:
        task = send_reminder.delay(request.user_id)
        return {
            "message": "Reminder task added successfully",
            "task_id": task.id,
            "user_id": request.user_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to add reminder: {str(e)}")

@app.get("/reminder/status/{task_id}")
async def get_task_status(task_id: str):
    """Get the status of a reminder task"""
    try:
        task_result = celery.AsyncResult(task_id)
        return {
            "task_id": task_id,
            "status": task_result.status,
            "result": task_result.result if task_result.ready() else None
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get task status: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 