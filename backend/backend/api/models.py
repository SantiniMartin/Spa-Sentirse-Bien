# models.py
from django.db import models

class Appointment(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateTimeField()
    service = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.name} - {self.service} on {self.date}"