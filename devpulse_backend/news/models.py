from django.db import models
from django.conf import settings

from django.contrib.auth.models import AbstractUser


class Article(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    source = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    published_at = models.DateTimeField()
    summary = models.TextField(blank=True)

    def __str__(self):
        return self.title


class Repo(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    summary = models.TextField(blank=True)





class SavedArticle(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="saved_articles")
    article = models.ForeignKey("Article", on_delete=models.SET_NULL, null=True)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'article')

    def __str__(self):

        try:

            return f"{self.user.username} -> {self.article.title}"

        except AttributeError:

            return f"{self.user.username} -> No Article"