#!/bin/bash
set -e

echo "=== Installing uv ==="
curl -LsSf https://astral.sh/uv/install.sh | sh
export PATH="$HOME/.cargo/bin:$PATH"

echo "=== Verifying uv installation ==="
uv --version

echo "=== Installing dependencies ==="
uv sync

echo "=== Verifying FastAPI installation ==="
uv run python -c "import fastapi; print(f'FastAPI {fastapi.__version__} installed')"

echo "=== Build complete ==="