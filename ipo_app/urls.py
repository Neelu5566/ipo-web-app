from django.urls import path
from .views import IPOListCreateAPIView, IPODetailAPIView

urlpatterns = [
    path('ipo/', IPOListCreateAPIView.as_view(), name='ipo-list'),
    path('ipo/<int:pk>/', IPODetailAPIView.as_view(), name='ipo-detail'),
]
