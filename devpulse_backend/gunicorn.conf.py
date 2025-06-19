# gunicorn.conf.py

bind = "0.0.0.0:8000"
workers = 4
worker_class = "sync"
loglevel = "debug"
timeout = 120
graceful_timeout = 30
capture_output = True
errorlog = "-"
