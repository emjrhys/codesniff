from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Code, Score, CodeSmell

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email')

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = ('id','title','content','language','creator','date_added')

class CodeSmellSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSmell
        fields = ('id','code','user','line','smell')

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ('id','code','user','score')