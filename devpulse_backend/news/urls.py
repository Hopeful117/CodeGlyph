from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet,TagListView,SourceListView,RepoViewSet,SavedArticleViewSet,RegisterView,SaveArticle


router = DefaultRouter()
router.register(r'articles', ArticleViewSet)
router.register(r'repos',RepoViewSet)
router.register(r'bookmark', SavedArticleViewSet,basename="bookmark")


urlpatterns = [
    path('', include(router.urls)),
    path('tags/', TagListView.as_view(), name='tag-list'),
    path('sources/',SourceListView.as_view(),name='source-list'),
    path('register/', RegisterView.as_view(), name='register'),
    path('savearticle/',SaveArticle.as_view(),name='savearticle')
   

]
