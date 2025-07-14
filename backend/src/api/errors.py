from fastapi import HTTPException, status

#===============================================#
# Exceptions
#===============================================#
reminder_task_exception = HTTPException(
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    detail="Failed to add reminder task",
)

task_status_exception = HTTPException(
    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
    detail="Failed to get task status",
)

