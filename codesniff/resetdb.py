# from django.conf import settings

# settings.configure()

from app.models import Code, Score, CodeSmell
from django.contrib.auth.models import User

import subprocess

subprocess.call(['./manage.py', 'flush'])
# subprocess.call(['./manage.py', 'createsuperuser'])

User.objects.create_superuser('admin', 'admin@admin.com', 'admin')

code = Code(title='hello world', content='print "hello world"', language='Python', creator_id=1)
code.save()
code = Code(title='var x', content='x = 0', language='Python', creator_id=1)
code.save()

codesmell = CodeSmell(code_id=1, user_id=1, line=1, smell='1')
codesmell.save()
codesmell = CodeSmell(code_id=1, user_id=1, line=1, smell='2')
codesmell.save()
codesmell = CodeSmell(code_id=2, user_id=1, line=1, smell='1')
codesmell.save()