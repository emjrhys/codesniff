from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from app.models import Code, Score, CodeSmell
from rest_framework import routers, serializers, viewsets
from rest_framework.authtoken import views

# Url patterns
internal = patterns('',
	url(r'^admin/', include(admin.site.urls)),
    url(r'^api-token-auth/', views.obtain_auth_token),
)

urlpatterns = patterns('',
    url(r'^app/', include('app.urls', namespace='app')),
    url(r'^docs/', include('rest_framework_swagger.urls')),
) 

urlpatterns = urlpatterns + patterns('',
	url(r'^', include(internal, namespace="internal")),
)

