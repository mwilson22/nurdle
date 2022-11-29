from django.urls import path

from .views import index
from .views import check_guess

urlpatterns = [
    path('', index),
    path('check_guess/', check_guess),
]
