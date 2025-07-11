# backend/api/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
import logging
from .models import ServiceBooking

from .serializers import (
    ContactMessageSerializer,
    RegisterSerializer,
    EmailTokenObtainPairSerializer,
    ServiceBookingSerializer
)

logger = logging.getLogger(__name__)

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_contact(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Your message has been sent successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        if User.objects.filter(email=email).exists():
            return Response({'message': 'Email already registered.'}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request):
    return Response({
        "message": "Welcome to the NeuraNest API Root",
        "endpoints": {
            "Contact Form": "/api/contact/",
            "Signup": "/api/signup/",
            "Login": "/api/login/",
        }
    })

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def get_username_by_email(request):
    email = request.query_params.get('email') if request.method == 'GET' else request.data.get('email')
    if not email:
        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(email=email)
        return Response({"username": user.username, "email": user.email})
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

# ✅ Updated service booking view to return ticket_id
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_service_booking(request):
    serializer = ServiceBookingSerializer(data=request.data)
    if serializer.is_valid():
        booking = serializer.save(user=request.user, email=request.user.email)
        return Response({
            "message": "Service booking submitted successfully!",
            "ticket_id": booking.ticket_id,
            "booking_id": booking.id,
            "user_email": booking.email
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_service_history(request):
    print("✅ Service history view accessed.")
    print("🔐 Logged-in user:", request.user)

    try:
        bookings = ServiceBooking.objects.filter(user=request.user).order_by('-booked_at')
        print(f"📦 Found {bookings.count()} booking(s) for user {request.user.username}")

        serializer = ServiceBookingSerializer(bookings, many=True)
        return Response(serializer.data)
    except Exception as e:
        print("❌ Error in get_user_service_history:", e)
        return Response({"error": str(e)}, status=500)