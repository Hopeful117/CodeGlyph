
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Article
from .models import Repo
from .serializers import ArticleSerializer,RepoSerializer
from rest_framework.decorators import action
from .utils import defaultList

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
    
    
