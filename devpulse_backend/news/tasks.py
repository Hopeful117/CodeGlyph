# app/tasks.py
from celery import shared_task

@shared_task
def update_articles_task():

    from news.utils import getAll
    getAll()
    return "Articles mis à jour"


def purge_articles_task():
    from news.utils import purge,getAll
    purge()
    getAll()
    return "Articles purgées"
