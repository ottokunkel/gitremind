from pydantic import BaseModel
from typing import Optional

#===============================================#
# Response models
#===============================================#

class ReminderResponse(BaseModel):
    message: str
    task_id: str
    user_id: str

class TaskStatusResponse(BaseModel):
    task_id: str
    status: str
    result: Optional[dict] = None
