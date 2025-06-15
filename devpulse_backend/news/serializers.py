from rest_framework import serializers
from .models import Article,Repo,SavedArticle


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'



class RepoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repo
        fields='__all__'






class SavedArticleSerializer(serializers.ModelSerializer):
    article_details = serializers.SerializerMethodField()
    class Meta:
        model = SavedArticle
        fields = ['id', 'article', 'saved_at', 'article_details']




    def get_article_details(self, obj):
        if not obj.article:
            return {
                'title': 'No Article',
                'url': '',
                'source': '',
                'language': '',
                'published_at': None,
                'summary': 'Article not available'
            }
        
        return {
            'title': obj.article.title,
            'url': obj.article.url,
            'source': obj.article.source,
            'language': obj.article.language,
            'published_at': obj.article.published_at,
            'summary': obj.article.summary
        }