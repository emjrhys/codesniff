from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.shortcuts import render
import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# imports for API
from app.models import Code, Score, CodeSmell
from app.serializers import UserSerializer, CodeSerializer, CodeSmellSerializer, ScoreSerializer
from rest_framework import mixins
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

# API functions
class UserList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        print self
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(username=request.data['username'], email=request.data['email'], password=request.data['password'])
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def get_queryset(self):
        username = self.request.user
        return User.objects.filter(username=username)

class CodeList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        return Code.objects.filter(creator=user)

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

class CodeDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        return Code.objects.filter(creator=user)


class CodeSmellList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = CodeSmell.objects.all()
    serializer_class = CodeSmellSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        code = self.kwargs['code']
        return CodeSmell.objects.filter(user=user, code_id=code)

    def perform_create(self, serializer):
        code = self.kwargs['code']
        serializer.save(user=self.request.user, code_id=code)

class CodeSmellDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = CodeSmell.objects.all()
    serializer_class = CodeSmellSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        code = self.kwargs['code']
        return CodeSmell.objects.filter(user=user, code_id=code)

class ScoreList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        code = self.kwargs['code']
        return Score.objects.filter(user=user, code_id=code)

    def perform_create(self, serializer):
        code = self.kwargs['code']
        serializer.save(user=self.request.user, code_id=code)

class ScoreDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

    def get_queryset(self):
        user = self.request.user
        code = self.kwargs['code']
        return Score.objects.filter(user=user, code_id=code)


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
			