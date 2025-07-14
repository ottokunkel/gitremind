#!/usr/bin/env python3
"""
Simple script to run the GitRemind API
"""
import sys
import os
from src.app import app
import uvicorn

# Add src directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 