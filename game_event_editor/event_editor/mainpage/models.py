from django.db import models

class Event(models.Model):
    event_id = models.CharField(max_length=20, unique=True)
    config_id = models.CharField(max_length=20)
    apply_area = models.CharField(max_length=100)
    apply_player = models.CharField(max_length=100)
    event_type = models.CharField(max_length=50)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    cfg_data = models.TextField()

    def __str__(self):
        return f"{self.event_id} - {self.event_type}"
