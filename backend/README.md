# GitRemind Backend

A reminder service backend built with FastAPI and Celery for background task processing.

### Install uv
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

### 1. Install Dependencies
```bash
uv sync
```

### 2. Set Up Environment Variables
Create a `.env` file in the project root:
```env
# Redis Configuration
REDIS_URL=redis://localhost:6379/0
```

### 4. Run the Application
```bash
uv run uvicorn src.app:app --host 0.0.0.0 --port 8000 --reload
```
