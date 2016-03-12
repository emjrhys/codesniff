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
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

# API functions
class UserPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET' and request.auth == None:
            return False
        else:
            return True

class UserList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (UserPermissions,)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(username=request.data['username'], email=request.data['email'], password=request.data['password'])
            user.save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        queryset = User.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset =  queryset.filter(username=username)
        return queryset

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

class UserMe(generics.GenericAPIView):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer

    def get(self, request, *args, **kwargs):
        username = self.request.user
        print username
        if username is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            user = User.objects.filter(username=username)
            code = Code.objects.filter(creator=username)
            userSerializer = UserSerializer(user, many=True).data
            codeSerializer = CodeSerializer(code, many=True).data
            data = {"user": userSerializer[0], "code": codeSerializer}
            return Response(data, status=status.HTTP_200_OK)   
            

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
        queryset = Code.objects.all()
        title = self.request.query_params.get('content', None)
        language = self.request.query_params.get('language', None)
        username = self.request.query_params.get('creator', None)
        date_added = self.request.query_params.get('date_added', None)
        if title is not None:
            queryset = queryset.filter(title=title)
        if language is not None:
            queryset = queryset.filter(language=language)
        if username is not None:
            queryset = queryset.filter(creator__username=username)
        if date_added is not None:
            queryset = queryset.filter(date_added=date_added)
        return queryset

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

class CodeSubmit(generics.GenericAPIView):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer

    def post(self, request, *args, **kwargs):
    	data = request.data
        user = data['creator']
    	code = data['code']
    	code = Code(title=code['title'], content=code['content'], language=code['language'], creator_id=user)
        try: 
            code.clean_fields()
            code.save()
        except Exception as error:
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

    	smells = data['smells']
    	for s in smells:
            smell = CodeSmell(code_id=code.id, user_id=user, line=s['line'], smell=s['smell'])
            try:
                smell.clean_fields()
                smell.save()
            except Exception as error:
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
    	return Response(CodeSerializer(code).data, status=status.HTTP_201_CREATED)

class CodeCheck(generics.GenericAPIView):
    queryset = CodeSmell.objects.all()
    serializer_class = CodeSmellSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        user = data['user']
        codeid = data['code']
        smells = data['smells']
        for s in smells:
            smell = CodeSmell(code_id=codeid, user_id=user, line=s['line'], smell=s['smell'])
            try: 
                smell.clean_fields()
                smell.save()
            except Exception as error:
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
        smells = map(lambda x:(x['line'], x['smell']), smells)
        origsmells = CodeSmell.objects.filter(code_id=codeid, user=Code.objects.filter(id=codeid)[0].creator)
        origsmells = map(lambda x:(x.line, x.smell), origsmells)
        score = 0
        for s in smells:
        	if s in origsmells:
        		score += 1
        score -= 0.5 * (len(origsmells) - score)
        score = score/len(origsmells) * 100
        score = Score(code_id=codeid, user_id=user, score=score)
        score.save()
        return Response(ScoreSerializer(score).data, status=status.HTTP_200_OK)

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
        queryset = CodeSmell.objects.all()
        code_id = self.request.query_params.get('code', None)
        username = self.request.query_params.get('username', None)
        line = self.request.query_params.get('line', None)
        smell = self.request.query_params.get('smell', None)
        if code_id is not None:
            queryset = queryset.filter(code_id=code_id)
        if username is not None:
            queryset = queryset.filter(user__username=username)
        if line is not None:
            queryset = queryset.filter(line=line)
        if smell is not None:
            queryset = queryset.filter(smell=smell)
        return queryset 

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
        queryset = Score.objects.all()
        code_id = self.request.query_params.get('code', None)
        username = self.request.query_params.get('username', None)
        score = self.request.query_params.get('score', None)
        if code_id is not None:
            queryset = queryset.filter(code_id=code_id)
        if username is not None:
            queryset = queryset.filter(user__username=username)
        if score is not None:
            queryset = queryset.filter(score=score)
        return queryset

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
			