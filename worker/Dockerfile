# Python 3.12
FROM python:3.12-slim-bookworm

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/
ENV PATH="/root/.cargo/bin:$PATH"

# Create a non-root user
RUN groupadd --gid 1000 worker && \
    useradd --uid 1000 --gid worker --shell /bin/bash --create-home worker

# Set working directory
WORKDIR /app

# Copy dependency files and install dependencies as root first
COPY pyproject.toml ./
COPY src/ ./src/
RUN uv sync

# Change ownership of the app directory to the worker user
RUN chown -R worker:worker /app

# Switch to the non-root user
USER worker

# Set environment variables
ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1

# Command to run the application
CMD ["uv", "run", "celery", "-A", "src.client", "worker", "--loglevel=info"]

