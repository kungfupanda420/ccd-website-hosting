from celery import Celery

celery_app=Celery(
    "id-card-worker",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

celery_app.conf.task_routes={
    "fastapi-backend/tasks/generate_id_cards.generate_id_cards":{"queue":"default"},
    "fastapi-backend/tasks/make_professor.prof_from_csv":{"queue":"default"},
    "fastapi-backend/tasks/next_round.send_round_emails":{"queue":"default"},
    "fastapi-backend/tasks/confirm_allotments.send_decision_emails":{"queue":"default"},
    "fastapi-backend/tasks/professor_pwd_emails.send_prof_emails":{"queue":"default"},
}

from tasks import generate_id_cards, make_professor, next_round, confirm_allotments,professor_pwd_emails

