from django.db import models
from django.contrib.auth.models import User


class CarNumber(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    number = models.CharField(max_length=7)  # AAA-001

    class Meta:
        # Can be set on number definition instead.
        unique_together = ('number',)

    def save(self, **kwargs):
        self.number = self.number.upper()
        return super(CarNumber, self).save(**kwargs)

    def __str__(self):
        return self.number