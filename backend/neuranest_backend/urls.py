# neuranest_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def welcome_message(request):
    return HttpResponse("<h1>Welcome to NeuraNest Backend API 🎉</h1><p>Access API at <a href='/api/'>/api/</a></p>")

urlpatterns = [
    path('', welcome_message),  # 👈 Shows welcome message at root
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]