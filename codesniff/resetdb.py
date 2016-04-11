# from django.conf import settings

# settings.configure()

from app.models import Code, Score, CodeSmell, Smell
from django.contrib.auth.models import User

import subprocess
from random import randint, sample

subprocess.call(['./manage.py', 'flush'])

admin = User.objects.create_superuser('admin', 'admin@admin.com', 'admin')
user = User.objects.create_user('test', 'test@test.com', 'test')
user.save()

with open('codesmells.txt') as f:
	for line in f:
		smell = Smell(name=line.replace('\n', ''))
		smell.save()

title = ''
content = ''
num_lines = 0
smells = map(lambda x:x.name, Smell.objects.all())
flag = False
with open('codesamples.txt') as f:
	for line in f:
		if line[:2] == '==':
			if flag:
				code = Code(title=title, content=content, language='Python', creator=admin)
				code.save()
				used_lines = []
				origsmells = []
				usersmells = []
				for i in range(num_lines/2):
					newsmell = (randint(1, num_lines), smells[randint(0, len(smells) - 1)])
					if newsmell[0] in used_lines:
						continue
					used_lines.append(newsmell[0])
					origsmells.append(newsmell)
					codesmell = CodeSmell(code=code, user=admin, line=newsmell[0], smell=newsmell[1])
					codesmell.save()
				correct = randint(0, len(origsmells))
				usersmells = sample(origsmells, correct)
				for newsmell in usersmells:
					codesmell = CodeSmell(code=code, user=user, line=newsmell[0], smell=newsmell[1])
					codesmell.save()

				score = 0
				correct = []
				incorrect = []
				missed = []
				if len(origsmells) > 0:
					for s in usersmells:
						if s in origsmells:
							score += 1
							correct.append({'line': s[0], 'smell': s[1]})
						else:
							incorrect.append({'line': s[0], 'smell': s[1]})
					incorrect_lines = map(lambda x:x['line'], incorrect)
					for s in origsmells:
						if s not in usersmells and s[0] not in incorrect_lines:
							missed.append({'line': s[0], 'smell': s[1]})
					score -= 0.5 * (len(missed) + len(incorrect))
					score = score/len(origsmells) * 100
					score = max(0, score)
				score = Score(code=code, user=user, score=score)
				score.save()

			flag = True
			title = line[2:]
			content = ''
			num_lines = 0
			continue
		content += line
		num_lines += 1