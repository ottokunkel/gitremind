from fastapi import FastAPI
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

from src.api.routes import router, limiter

# Create FastAPI app with disabled docs
app = FastAPI(
    title="GitRemind API",
    description="A reminder service with FastAPI and Celery",
    version="0.1.0",
    docs_url=None,  # Disable Swagger UI
    redoc_url=None,  # Disable ReDoc
)

# Add rate limiting middleware
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Include the router in the app
app.include_router(router)