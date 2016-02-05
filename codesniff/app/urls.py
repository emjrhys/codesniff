from django.conf.urls import patterns, url
from app import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^login/$', views.login_view, name='login'),
	url(r'^login/e=(?P<error>[0-9])&m=(?P<message>[0-9])/$', views.login_view, name='login'),
	url(r'^register/$', views.register, name='register'),
	url(r'^register/e=(?P<error>[0-9])$', views.register, name='register'),
	url(r'^account_request/(?P<type>[A-Za-z]+)/$', views.account_request, name='account_request'),

	#urls for api
	url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^codes/$', views.CodeList.as_view()),
    url(r'^codes/(?P<pk>[0-9]*)/$', views.CodeDetail.as_view()),
    url(r'^code/(?P<code>[0-9]+)/codesmells/$', views.CodeSmellList.as_view()),
    url(r'^codesmells/(?P<pk>[0-9]+)/$', views.CodeSmellDetail.as_view()),
    url(r'^code/(?P<code>[0-9]+)/scores/$', views.ScoreList.as_view()),
    url(r'^scores/(?P<pk>[0-9]+)/$', views.ScoreDetail.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)