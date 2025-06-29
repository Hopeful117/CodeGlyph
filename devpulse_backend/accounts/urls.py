# accounts/urls.py
from django.urls import path
from .views import SendMagicLinkView, VerifyMagicLinkView

urlpatterns = [
path('magiclink/request/', SendMagicLinkView.as_view(), name='magiclink-request'),
path('magiclink/verify/',VerifyMagicLinkView.as_view(), name='magiclink-verify'),
]

