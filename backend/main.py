from src.app import app
import uvicorn

def main():
    """Entry point for running the server."""
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)


if __name__ == "__main__":
    main()