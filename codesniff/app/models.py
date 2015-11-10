from django.db import models

# Create your models here.

class Code(models.Model):
	content = models.TextField()
	language = models.TextField()
	user = models.TextField() #models.ForeignKey(User)

class Comment(models.Model):
	content = models.TextField()
	line = models.IntegerField()
	user = models.TextField() #models.ForeignKey(User)
	code = models.ForeignKey(Code)