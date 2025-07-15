#!/bin/bash

echo "🔧 Starting Django backend..."

# Activate virtual environment (adjust path if needed)
source venv/bin/activate

# Run Django server
python manage.py runserver