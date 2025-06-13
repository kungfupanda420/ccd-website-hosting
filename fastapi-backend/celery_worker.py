from celery import Celery

celery_app=Celery(
    "id-card-worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

celery_app.conf.task_routes={
    "fastapi-backend/tasks/generate_id_cards.generate_id_cards":{"queue":"default"},
}