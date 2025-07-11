# backend/api/serializers.py

from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import ContactMessage, ServiceBooking

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    pass

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"}
    )
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class ServiceBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceBooking
        fields = [
            'id',
            'ticket_id',
            'name',
            'phone',
            'service_type',
            'preferred_date',
            'message',
            'email',
            'booked_at',
            'status'  # ✅ Include status here
        ]
        read_only_fields = ['id', 'email', 'booked_at', 'ticket_id', 'status']  # keep status read-only unless you want frontend to edit it