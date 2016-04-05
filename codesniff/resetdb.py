# from django.conf import settings

# settings.configure()

from app.models import Code, Score, CodeSmell, Smell
from django.contrib.auth.models import User

import subprocess

subprocess.call(['./manage.py', 'flush'])
# subprocess.call(['./manage.py', 'createsuperuser'])

User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
user = User.objects.create_user('test', 'test@test.com', 'test')
user.save()

code = Code(title='hello world', content='print "hello world"', language='Python', creator_id=1)
code.save()
code = Code(title='var x', content='x = 0', language='Python', creator_id=1)
code.save()

codesmell = CodeSmell(code_id=1, user_id=1, line=1, smell='too many bugs')
codesmell.save()
codesmell = CodeSmell(code_id=1, user_id=1, line=1, smell='too hard to understand')
codesmell.save()

with open('codesmells.txt') as f:
	for line in f:
		smell = Smell(name=line.replace('\n', ''))
		smell.save()