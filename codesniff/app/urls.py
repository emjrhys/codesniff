from django.conf.urls import patterns, url
from app import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^login/$', views.login_view, name='login'),
	url(r'^login/e=(?P<error>[0-9])&m=(?P<message>[0-9])/$', views.login_view, name='login'),
	url(r'^register/$', views.register, name='register'),
	url(r'^register/e=(?P<error>[0-9])$', views.register, name='register'),
	url(r'^account_request/(?P<type>[A-Za-z]+)/$', views.account_request, name='account_request'),
)
