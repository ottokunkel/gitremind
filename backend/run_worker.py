#!/usr/bin/env python3
"""
Simple script to run the GitRemind Celery worker
"""
import sys
import os

# Add src directory to Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

if __name__ == "__main__":
    import subprocess
    import os
    
    # Change to the directory containing the src folder
    os.chdir(os.path.dirname(__file__))
    
    # Run celery worker with the new module path
    cmd = ["celery", "-A", "src.worker", "worker", "--loglevel=info"]
    subprocess.run(cmd) 