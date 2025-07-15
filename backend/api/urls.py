# backend/api/urls.py

from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    # Root API endpoint
    path('', views.api_root, name='api-root'),

    # Contact message submission
    path('contact/', views.submit_contact, name='submit-contact'),

    # User registration
    path('signup/', views.signup, name='signup'),

    # JWT login using email
    path('login/', views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

    # JWT refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Get username by email
    path('get-username/', views.get_username_by_email, name='get-username'),

    # ✅ Service Booking Submission with ticket generation
    path('bookings/', views.submit_service_booking, name='submit-service-booking'),

    # ✅ Service History for Logged-in User
    path('service-history/', views.get_user_service_history, name='service-history'),

    # ✅ Cancel Booking by ID (if not completed)
    path('bookings/<int:booking_id>/cancel/', views.cancel_booking, name='cancel-booking'),
]