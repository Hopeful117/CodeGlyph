from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet,TagListView,SourceListView,RepoViewSet


router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'repos',RepoViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('tags/', TagListView.as_view(), name='tag-list'),
    path('sources/',SourceListView.as_view(),name='source-list'),
   

]
