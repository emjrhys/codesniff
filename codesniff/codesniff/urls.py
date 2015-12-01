from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from app.models import Code, Scores, CodeSmells
from rest_framework import routers, serializers, viewsets

# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username','email')

# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Serializers define the API representation.
class CodeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Code
        fields = ('content','language','creator','date_added')

# ViewSets define the view behavior.
class CodeViewSet(viewsets.ModelViewSet):
    queryset = Code.objects.all()
    serializer_class = CodeSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'code', CodeViewSet)

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
