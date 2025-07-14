# GitRemind Worker

This is a Celery worker for sending reminders.

## Installation

1. Install dependencies using [uv](https://github.com/astral-sh/uv):

```bash
uv sync   
```

2. Copy `.env.example` to `.env` and set your `REDIS_URL`.

## Usage

Start the worker with:

```bash
celery -A src.client worker --loglevel=info
```

## Running with Docker
```bash
docker build -t worker .
docker run --env-file .env worker
```