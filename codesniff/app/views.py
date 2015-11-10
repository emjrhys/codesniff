from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.shortcuts import render
#from app.models import 
import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# Create your views here.

def index(request):
	context = {
	}
	return render(request, 'app/index.html', context)

def login_view(request, error = 0, message = 0):
	context = {
		'error': error,
		'message': message,
	}
	return render(request, 'app/login.html', context)

def register(request, error = 0):
	context = {
		'error': error,
	}
	return render(request, 'app/register.html', context)

def account_request(request, type):
	if type == 'logout':
		logout(request)
		return HttpResponseRedirect(reverse('app:login', args=(0, 2,)))

	username = request.POST['username']
	password = request.POST['password']
	
	if type == 'login':
		user = authenticate(username=username, password=password)
		if user is not None:
			if user.is_active:
				login(request, user)
				if('app/login' in request.META.get('HTTP_REFERER')):
					return HttpResponseRedirect("/app")
				else:
					return HttpResponseRedirect(request.META.get('HTTP_REFERER'))
		return HttpResponseRedirect(reverse('app:login', args=(1, 0,)))
	elif type == 'register':
		user = User.objects.filter(username=username);
		if len(user) > 0:
			return HttpResponseRedirect(reverse('app:register', args=(1,)))
		elif password != request.POST['confirm']:
			return HttpResponseRedirect(reverse('app:register', args=(2,)))
		else:
			user = User.objects.create_user(username=username, password=password)
			user.save()
			return HttpResponseRedirect(reverse('app:login', args=(0, 1,)))