# app/tasks.py
from celery import shared_task

@shared_task
def update_articles_task():
    # Ici appelle ta fonction qui récupère et met à jour les articles
    from news.utils import getAll
    getAll()
    return "Articles mis à jour"


def purge_articles_task():
    from news.utils import purge
    purge()
    return "Articles purgées"
