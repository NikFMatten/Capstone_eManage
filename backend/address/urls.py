from django.urls import path
from . import views

urlpatterns = [
    path('', views.list_of_addresses),
    path('<int:pk>/', views.address_detail),
    path('user/<int:user_id>/', views.user_address)
]