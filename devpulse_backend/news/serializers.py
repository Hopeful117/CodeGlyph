from rest_framework import serializers
from .models import Article,Repo

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'



class RepoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repo
        fields='__all__'
