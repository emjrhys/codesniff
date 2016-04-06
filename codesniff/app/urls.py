from django.conf.urls import patterns, url
from app import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = patterns('',
	#urls for api
	url(r'^users/$', views.UserList.as_view()),
    url(r'^users/me/$', views.UserMe.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^codes/$', views.CodeList.as_view()),
    url(r'^codes/(?P<pk>[0-9]*)/$', views.CodeDetail.as_view()),
    url(r'^codesmells/$', views.CodeSmellList.as_view()),
    url(r'^codesmells/(?P<pk>[0-9]+)/$', views.CodeSmellDetail.as_view()),
    url(r'^scores/$', views.ScoreList.as_view()),
    url(r'^scores/(?P<pk>[0-9]+)/$', views.ScoreDetail.as_view()),
    url(r'^smells/$', views.SmellList.as_view()),
    url(r'^smells/(?P<pk>[0-9]*)/$', views.SmellDetail.as_view()),
    url(r'^submit/$', views.CodeSubmit.as_view()),
    url(r'^checksmells/$', views.CodeCheck.as_view()),
)

urlpatterns = format_suffix_patterns(urlpatterns)