from src.client import app

# Entry point
if __name__ == '__main__':
    app.worker_main(['worker', '--loglevel=info'])
