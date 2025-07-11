from django.db import models
from django.contrib.auth import get_user_model
from django.utils.timezone import now
import uuid

User = get_user_model()

class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

class ServiceBooking(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='service_bookings')
    email = models.EmailField(help_text="Email of the user at the time of booking.")
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    service_type = models.CharField(max_length=100)
    preferred_date = models.DateField()
    message = models.TextField(blank=True, null=True)
    booked_at = models.DateTimeField(auto_now_add=True)

    # Ticket ID (auto-generated)
    ticket_id = models.CharField(max_length=50, null=True, blank=True)

    # Status field with dropdown choices
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')

    def save(self, *args, **kwargs):
        if not self.ticket_id:
            date_str = now().strftime('%Y%m%d')
            unique_suffix = str(uuid.uuid4())[:6].upper()
            self.ticket_id = f"NEURA-{date_str}-{unique_suffix}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking {self.ticket_id} by {self.name} ({self.email})"

    class Meta:
        ordering = ['-booked_at']