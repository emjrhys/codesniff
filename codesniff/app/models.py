from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Code(models.Model):
	title = models.TextField(default="Code")
	content = models.TextField()
	language = models.TextField()
	creator = models.ForeignKey(User, default=1)
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


