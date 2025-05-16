from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=255)
    url = models.URLField()
    source = models.CharField(max_length=100)
    language = models.CharField(max_length=50)
    published_at = models.DateTimeField()
    summary = models.TextField(blank=True)

    def __str__(self):
        return self.title
