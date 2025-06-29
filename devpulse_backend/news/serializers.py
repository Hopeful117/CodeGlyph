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
   
    class Meta:
        model = SavedArticle
        fields = '__all__'



