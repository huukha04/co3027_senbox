FROM python:3.12-slim
 
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1
 
WORKDIR /app
 
# Thư viện hệ thống cho Postgres driver (psycopg2); gỡ trình biên dịch sau khi cài xong
COPY backend/requirements.txt ./requirements.txt
RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && pip install -r requirements.txt \
    && apt-get purge -y --auto-remove gcc \
    && rm -rf /var/lib/apt/lists/*
 
COPY backend/app ./backend/app
 
# Chạy bằng user thường, không dùng root
RUN useradd -m appuser && chown -R appuser /app
USER appuser
 
EXPOSE 8000
 
CMD ["sh", "-c", "exec uvicorn --app-dir backend app.main:app --host 0.0.0.0 --port 8000"]
 