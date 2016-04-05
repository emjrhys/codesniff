from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Code, Score, CodeSmell, Smell

# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = ('id','title','content','language','creator','date_added', 'difficulty')
        extra_kwargs = {'date_added': {'read_only': True}}

class CodeSmellSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSmell
        fields = ('id','code','user','line','smell')

class SmellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Smell
        fields = ('id','name')

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ('id','code','user','score')
