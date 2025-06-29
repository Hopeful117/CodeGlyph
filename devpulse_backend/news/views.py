
from django.shortcuts import render
from rest_framework import viewsets,permissions,status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Article
from .models import Repo,SavedArticle
from .serializers import ArticleSerializer,RepoSerializer,SavedArticleSerializer
from rest_framework.decorators import action
from .utils import defaultList
from django.contrib.auth.models import User
import datetime
from django.db.utils import IntegrityError

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all().order_by('-published_at')
    serializer_class = ArticleSerializer


    @action(detail=False, methods=['get'], url_path='tag/(?P<tag>[^/.]+)')
    def by_tag(self, request, tag=None):
        filtered = self.queryset.filter(language__iexact=tag)
        page = self.paginate_queryset(filtered)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(filtered, many=True)
        return Response(serializer.data)
    
      

    @action(detail=False, methods=['get'], url_path='source/(?P<source>[^/.]+)')
    def by_source(self, request, source=None):
        filtered = self.queryset.filter(source__iexact=source)
        page = self.paginate_queryset(filtered)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        
        serializer = self.get_serializer(filtered, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'], url_path='search/(?P<source>[^/]+)/(?P<tag>[^/]+)')
    def by_tagAndbysource(self,request,tag=None,source=None):
        filtered=self.queryset.filter(source__iexact=source,language__iexact=tag)
        page = self.paginate_queryset(filtered)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        
        serializer = self.get_serializer(filtered, many=True)
        return Response(serializer.data)
    


class TagListView(APIView):
    def get(self,request):
        return Response({"tags":defaultList})
    
class SourceListView(APIView):
    def get(self,request):
        sources = Article.objects.values_list('source', flat=True).distinct()
        return Response({"sources":sources})
    


class RepoViewSet(viewsets.ReadOnlyModelViewSet):
    
    queryset=Repo.objects.all()
    serializer_class = RepoSerializer


class SavedArticleViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = SavedArticleSerializer

    def get_queryset(self):
        return SavedArticle.objects.filter(user=self.request.user)

  

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    

class SaveArticle(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        user = User.objects.filter(username=request.user).first()
        data = request.data
        
        url = data.get('url')
       

        if not Article.objects.filter(url=url).exists():
            return Response({"error": "L'article n'existe pas"}, status=status.HTTP_400_BAD_REQUEST)
        
        else:
            article=Article.objects.filter(url=url).first()

       
        try:
            saved_article=SavedArticle.objects.create(user=user,title=article.title,url=article.url,source=article.source,language=article.language,published_at=article.published_at,summary=article.summary)
        except IntegrityError:
            return Response({"error": "Article déjà sauvegardé."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = SavedArticleSerializer(saved_article)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def delete(self,request):
        user = User.objects.filter(username=request.user).first()
        url = request.data.get('url')

        try:
            article = SavedArticle.objects.get(user=user,url=url)
            article.delete()
            return Response({"message": "Article supprimé."}, status=status.HTTP_204_NO_CONTENT)
        
        except SavedArticle.DoesNotExist:
            return Response({"error": "Article non sauvegardé."}, status=status.HTTP_400_BAD_REQUEST)



class RegisterView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if User.objects.filter(username=username).exists():
            return Response({"error": "Username taken"}, status=status.HTTP_400_BAD_REQUEST)
        User.objects.create_user(username=username, password=password)
        return Response({"message": "Account created"}, status=status.HTTP_201_CREATED)
    
    
