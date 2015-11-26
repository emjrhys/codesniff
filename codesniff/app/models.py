from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Code(models.Model):
	content = models.TextField()
	language = models.TextField()
	creator = models.ForeignKey(User, default=1)
	date_added = models.DateTimeField(auto_now=True)

class Scores(models.Model):
	code = models.ForeignKey(Code)
	user = models.ForeignKey(User)
	score = models.DecimalField(max_digits=5, decimal_places=2)

class CodeSmells(models.Model):
	code = models.ForeignKey(Code)
	user = models.ForeignKey(User)
	line = models.IntegerField()
	smell = models.TextField()


