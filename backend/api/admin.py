from django.contrib import admin
from .models import ContactMessage, ServiceBooking

# -----------------------------
# Admin for ContactMessage
# -----------------------------
@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message', 'created_at')  # Columns shown in admin
    search_fields = ('name', 'email', 'message')              # Search functionality
    list_filter = ('created_at',)                             # Date filter

# -----------------------------
# Admin for ServiceBooking
# -----------------------------
@admin.register(ServiceBooking)
class ServiceBookingAdmin(admin.ModelAdmin):
    list_display = (
        'ticket_id', 'user', 'email', 'name', 'phone',
        'service_type', 'preferred_date', 'status', 'booked_at'
    )
    search_fields = (
        'ticket_id', 'user__username', 'email', 'name',
        'phone', 'service_type'
    )
    list_filter = ('service_type', 'preferred_date', 'status', 'booked_at')
    date_hierarchy = 'preferred_date'
    
    # ✅ Fields you cannot edit
    readonly_fields = ('ticket_id', 'user', 'email', 'booked_at')

    # ✅ Fields shown in form view (include 'status' so it's editable)
    fields = (
        'ticket_id', 'user', 'email', 'name', 'phone',
        'service_type', 'preferred_date', 'message',
        'status', 'booked_at'
    )