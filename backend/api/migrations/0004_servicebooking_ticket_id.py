# Generated by Django 5.2.1 on 2025-06-30 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_servicebooking_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicebooking',
            name='ticket_id',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True),
        ),
    ]
