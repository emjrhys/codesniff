from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from app.models import Code, Score, CodeSmell
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username','email')

class CodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Code
        fields = ('content','language','creator','date_added')

class CodeSmellSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CodeSmell
        fields = ('code','user','line','smell')

class ScoreSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Score
        fields = ('code','user','score')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer

class CodeSmellViewSet(viewsets.ModelViewSet):
    queryset = CodeSmell.objects.all()
    serializer_class = CodeSmellSerializer 

class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer  

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'code', CodeViewSet)
router.register(r'codesmell', CodeSmellViewSet)
router.register(r'score', ScoreViewSet)

# Url patterns
urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'codesniff.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^app/', include('app.urls', namespace='app')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
)
