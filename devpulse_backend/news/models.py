from django.db import models
from django.conf import settings
import uuid
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class Article(models.Model):
    title = models.CharField(max_length=500)
    url = models.URLField(max_length=1000)
    source = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    published_at = models.DateTimeField()
    summary = models.TextField(blank=True)

    def __str__(self):
        return self.title


class Repo(models.Model):
    title = models.CharField(max_length=500)
    url = models.URLField(max_length=1000)
    summary = models.TextField(blank=True)





class SavedArticle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="saved_articles")
    title = models.CharField(max_length=500)
    url = models.URLField(max_length=1000)
    source = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    published_at = models.DateTimeField()
    summary = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'url')

