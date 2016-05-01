from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

"""
Stores all code snippets uploaded.
Stores the title, code content, language it is written in, the user who uploaded the code, the date added, and the difficulty from 0 to 100.
"""
class Code(models.Model):
	title = models.TextField(default="Code")
	content = models.TextField()
	language = models.TextField()
	creator = models.ForeignKey(User)
	date_added = models.DateTimeField(auto_now=True)
	difficulty = models.IntegerField(default=0)

"""
Stores all scores received by users for a code snippet.
Stores which code snippet the score is for, the user who received the score, and the score value from 0 to 100.
"""
class Score(models.Model):
	code = models.ForeignKey(Code)
	user = models.ForeignKey(User)
	score = models.DecimalField(max_digits=5, decimal_places=2)

"""
Stores all code smells.
Stores which code snippet the code smell is for, the user who identified the code smell, the line number of the code smell, and the type of code smell

TODO: Look into storing a more specific location of the code smell so that code smells don't have to refer to a single line and could rather refer to a variable name, multiple lines, etc.
"""
class CodeSmell(models.Model):
	code = models.ForeignKey(Code)
	user = models.ForeignKey(User)
	line = models.IntegerField()
	smell = models.TextField()

"""
Stores a predetermined set of code smells that users can pick from to label code snippets with code smells. 
"""
class Smell(models.Model):
	name = models.TextField()

"""
Creates a unique token for each user saved to the database
"""
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
