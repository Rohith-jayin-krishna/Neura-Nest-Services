# backend/api/migrations/0006_fill_ticket_ids.py

from django.db import migrations
from django.utils.timezone import now
import uuid

def generate_ticket_id():
    date_str = now().strftime('%Y%m%d')
    unique_suffix = str(uuid.uuid4())[:6].upper()
    return f"NEURA-{date_str}-{unique_suffix}"

def fill_ticket_ids(apps, schema_editor):
    ServiceBooking = apps.get_model('api', 'ServiceBooking')
    for booking in ServiceBooking.objects.filter(ticket_id__isnull=True):
        booking.ticket_id = generate_ticket_id()
        booking.save()

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_servicebooking_ticket_id'),
    ]

    operations = [
        migrations.RunPython(fill_ticket_ids),
    ]