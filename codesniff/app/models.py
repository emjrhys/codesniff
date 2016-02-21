from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# Create your models here.

class Code(models.Model):
	title = models.TextField(default="Code")
	content = models.TextField()
	language = models.TextField()
	creator = models.ForeignKey(User)
	date_added = models.DateTimeField(auto_now=True)

class Score(models.Model):
	code = models.ForeignKey(Code)
	user = models.ForeignKey(User)
	score = models.DecimalField(max_digits=5, decimal_places=2)

class CodeSmell(models.Model):
	code = models.ForeignKey(Code)
	user = models.ForeignKey(User)
	line = models.IntegerField()
	smell = models.TextField()

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
