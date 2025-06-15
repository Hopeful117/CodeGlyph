from django.contrib import admin
from .models import Article,Repo,SavedArticle


class ArticleAdmin(admin.ModelAdmin):
    list_display=('title','url','source','language','published_at','summary')
    search_fields=['title','source','language']
    list_filter=('language','source')
    
admin.site.register(Article,ArticleAdmin)


class RepoAdmin(admin.ModelAdmin):
    list_display=('title','url','summary')
    search_fields=['title']
admin.site.register(Repo,RepoAdmin)


class SavedArticleAdmin(admin.ModelAdmin):
    list_display=('user','article','saved_at')
    search_fields=['user']

admin.site.register(SavedArticle,SavedArticleAdmin)