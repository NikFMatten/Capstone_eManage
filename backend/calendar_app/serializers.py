from rest_framework import serializers
from .models import Calendar

class CalendarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendar
        fields = ['id', 'employee_name', 'start','end']