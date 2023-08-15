from django.db import models

class Images(models.Model):
    name = models.CharField(max_length=100)
    url = models.ImageField(upload_to='images/', blank=True, null=True)

    def __str__(self):
        return self.name