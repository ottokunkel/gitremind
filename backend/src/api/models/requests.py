from pydantic import BaseModel

#===============================================#
# Request models
#===============================================#

class ReminderRequest(BaseModel):
    user_id: str
