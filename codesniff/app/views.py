from django.http import HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.shortcuts import render
import datetime
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout

# imports for API
from app.models import Code, Score, CodeSmell, Smell
from app.serializers import UserSerializer, CodeSerializer, CodeSmellSerializer, ScoreSerializer, SmellSerializer
from rest_framework import mixins
from rest_framework import generics
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token

"""
Custom permissions.
Currently not being used because authentication is mostly handled by the front end. Currently anyone can use the API endpoints.

TODO: determine security/permissions and modify function accordingly.
"""
class UserPermissions(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET' and request.auth == None:
            return False
        else:
            return True

"""
API function for /users endpoint.
Supports GET and POST for list of all users.
"""
class UserList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieve a list of users.

        Query parameters:

        - username: the username of the user you want returned
        """
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Add a new user. 
        """
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

"""
API function for /users/:id endpoint.
Supports GET, POST, PUT, and DELETE for specified user.
"""
class UserDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        """
        Get details of specified user.
        """
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Partially update a user.
        """
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """
        Replace entire user with supplied user.
        """
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        Delete specified user. 
        """
        return self.destroy(request, *args, **kwargs)

"""
API function for /users/me endpoint.
Returns current logged in user id, username, email, and list of submitted code snippets.
"""
class UserMe(generics.GenericAPIView):
    """
    Gets current logged-in user's id, username, email, and list of submitted code snippets.

    Supply user's unique token in the request header. The header is "Authorization" and the value is "Token {put token here}"
    """
    queryset = Code.objects.all()

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
            
"""
API function for /codes endpoint.
Supports GET and POST for list of all code snippets. 

TODO: Implement query by difficulty.
"""
class CodeList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieve a list of code snippets.

        Query parameters:

        - title: the title of the code snippet 

        - language: the language of the code snippet (Java, C, etc) 

        - username: the username of the creator of the code snippet

        - date_added: the date added of the code snippet
        """
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Add a new code snippet.
        """
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Code.objects.all()
        title = self.request.query_params.get('title', None)
        language = self.request.query_params.get('language', None)
        username = self.request.query_params.get('creator', None)
        date_added = self.request.query_params.get('date_added', None)
        if title is not None:
            queryset = queryset.filter(title=title)
        if language is not None:
            queryset = queryset.filter(language=language)
        if username is not None:
            queryset = queryset.filter(creator=username)
        if date_added is not None:
            queryset = queryset.filter(date_added=date_added)
        return queryset

"""
API function for /codes/:id endpoint.
Supports GET, POST, PUT, and DELETE for specified code snippet.
"""
class CodeDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer

    def get(self, request, *args, **kwargs):
        """
        Get details of specified code snippet. 
        """
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Partially update a code snippet. 
        """
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """
        Replace entire code snippet with supplied code snippet.
        """
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        Delete specified code snippet.
        """
        return self.destroy(request, *args, **kwargs)

"""
API function for /submit endpoint.
"""
class CodeSubmit(generics.GenericAPIView):
    queryset = Code.objects.all()

    def post(self, request, *args, **kwargs):
        """
        Submit a new code snippet with a list of codesmells together.

        Example POST body:
        <code>

            {
                "creator" : 18,
                "code" : "{'title' : 'Third Code Snippet!', 'content' : 'sum = 3+4', 'language' : 'Python'}",
                "smells" : "[{'line': 1, 'smell': 'Vague string'}, {'line': 2, 'smell': 'Bad variable name'}]"
            }

        </code>
        ---
        parameters:
            - name: body
              paramType: body
              description: See example POST body above
        consumes:
            - application/json
        """
        data = request.data
        user = data['creator']
        code = eval(data['code'])
        code = Code(title=code['title'], content=code['content'], language=code['language'], creator_id=user)
        try: 
            code.clean_fields()
            code.save()
        except Exception as error:
            return Response(error, status=status.HTTP_400_BAD_REQUEST)

        smells = eval(data['smells'])
        for s in smells:
            smell = CodeSmell(code_id=code.id, user_id=user, line=s['line'], smell=s['smell'])
            try:
                smell.clean_fields()
                smell.save()
            except Exception as error:
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
        return Response(CodeSerializer(code).data, status=status.HTTP_201_CREATED)

"""
API function for /checksmells endpoint.
"""
class CodeCheck(generics.GenericAPIView):
    queryset = CodeSmell.objects.all()

    def post(self, request, *args, **kwargs):
        """
        Submit a list of code smells and check it against the original uploader's code snippets to calculate a score for the user. 

        Example POST body:
        <code>

            {
                "user" : 17,
                "code" : 38,
                "smells" : "[{'line': 1, 'smell': 'Vague string'}, {'line': 2, 'smell': 'Bad variable name'}]"
            }

        </code>

        Get back a list of incorrect, missed, and correct code smells labelled.
        ---
        parameters:
            - name: body
              paramType: body
              description: See example POST body above
        consumes:
            - application/json
        """
        data = request.data
        user = data['user']
        codeid = data['code']
        smells = eval(data['smells'])
        CodeSmell.objects.filter(code_id=codeid, user=user).delete()
        for s in smells:
            smell = CodeSmell(code_id=codeid, user_id=user, line=s['line'], smell=s['smell'])
            try: 
                smell.clean_fields()
                smell.save()
            except Exception as error:
                return Response(error, status=status.HTTP_400_BAD_REQUEST)
        smells = map(lambda x:(x['line'], x['smell']), smells)
        """
        Code smells are compared against answers (code smells assigned by creator)
        """
        origsmells = CodeSmell.objects.filter(code_id=codeid, user=Code.objects.filter(id=codeid)[0].creator)
        origsmells = map(lambda x:(x.line, x.smell), origsmells)
        score = 0
        correct = []
        incorrect = []
        missed = []
        """
        Score is calculated as follows: ((# correct answers) - 0.5*((# missed answers) + (# incorrect answers)))/(# originally assigned code smells)
        """
        if len(origsmells) > 0:
            for s in smells:
                if s in origsmells:
                    score += 1
                    correct.append({'line': s[0], 'smell': s[1]})
                else:
                    incorrect.append({'line': s[0], 'smell': s[1]})
            incorrect_lines = map(lambda x:x['line'], incorrect)
            for s in origsmells:
                if s not in smells and s[0] not in incorrect_lines:
                    missed.append({'line': s[0], 'smell': s[1]})
            score -= 0.5 * (len(missed) + len(incorrect))
            score = score/len(origsmells) * 100
            score = max(0, score)
        Score.objects.filter(code_id=codeid, user_id=user).delete()
        score = Score(code_id=codeid, user_id=user, score=score)
        score.save()
        """
        Code's difficulty is assigned based on number of code smells (capped at 10) and average score
        """
        scores = Score.objects.filter(code_id=codeid)
        scores = map(lambda x: x.score, scores)
        avg = sum(scores)/len(scores)
        code = Code.objects.get(pk=codeid)
        code.difficulty = (min(len(origsmells) * 10, 100) + 100 - avg) / 2
        code.save()
        data = { 'score': score.score,
                 'correct': correct,
                 'incorrect': incorrect,
                 'missed': missed }
        return Response(data, status=status.HTTP_200_OK)

"""
API function for /codesmells endpoint.
Supports GET and POST for list of all code smells.
"""
class CodeSmellList(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = CodeSmell.objects.all()
    serializer_class = CodeSmellSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieve a list of code smells.

        Query parameters:

        - code: the id of the code snippet the code smell is labelled on 

        - username: the username of the user who labelled the code smell

        - line: the line number of the code smell

        - smell: the name of the code smell
        """
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Add a new code smell.
        """
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

"""
API function for /codesmells/:id endpoint.
Supports GET, POST, PUT, and DELETE for specified code smell.
"""
class CodeSmellDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = CodeSmell.objects.all()
    serializer_class = CodeSmellSerializer

    def get(self, request, *args, **kwargs):
        """
        Get details of specified code smell. 
        """
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Partially update a code smell. 
        """
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """
        Replace entire code smell with supplied code smell.
        """
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        Delete specified code smell.
        """
        return self.destroy(request, *args, **kwargs)

"""
API function for /smells endpoint.
Supports GET and POST for list of all predetermined code smells used in CodeSniff.
"""
class SmellList(mixins.ListModelMixin,
                    mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Smell.objects.all()
    serializer_class = SmellSerializer

    def get(self, request, *args, **kwargs):
        """
        Get list of predetermined code smells to choose for labelling. 
        """
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Add a new code smell to the list of predetermined code smells to choose for labelling. 
        """
        return self.create(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Smell.objects.all()
        return queryset 

"""
API function for /smells/:id endpoint.
Supports GET, POST, PUT, and DELETE for specified code smell from predeterminedlist of code smells used in CodeSniff.
"""
class SmellDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Smell.objects.all()
    serializer_class = SmellSerializer

    def get(self, request, *args, **kwargs):
        """
        Get details of specified code smell from the list of predetermined code smells to choose for labelling.
        """
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Partially update a code smell from the list of predetermined code smells to choose for labelling. 
        """
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """
        Replace an entire code smell with supplied code smell for the list of predetermined code smells to choose for labelling. 
        """
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        Delete specified code smell from list of predetermined code smells to choose for labelling. 
        """
        return self.destroy(request, *args, **kwargs)

"""
API function for /scores endpoint.
Supports GET and POST for list of all scores.
"""
class ScoreList(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

    def get(self, request, *args, **kwargs):
        """
        Retrieve a list of scores.

        Query parameters:

        - code: the id of the code snippet the score is associated with

        - username: the username of the user who received a score

        - score: a specific score value (between 0 an 100)
        """
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Add a new score. 
        """
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

"""
API function for /scores/:id endpoint.
Supports GET, POST, PUT, and DELETE for specified score.
"""
class ScoreDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

    def get(self, request, *args, **kwargs):
        """
        Get details of specified score. 
        """
        return self.retrieve(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        """
        Partially update a score.
        """
        return self.partial_update(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        """
        Replace entire score with supplied score.
        """
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        """
        Delete specified score.
        """
        return self.destroy(request, *args, **kwargs)