from rest_framework import serializers
from django.contrib.auth.models import User
from app.models import Code, Score, CodeSmell, Smell

# Serializers convert model instances into native Python datatypes that can be easily rendered into JSON.

"""
Serializes user model instances.
Returns a JSON serializable datatype with the user's: id, username, email, password.
User's password cannot be read.
"""
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

"""
Serializes code snippet model instances.
Returns a JSON serializable datatype with the fields: id, title, content, language, creator, date_added, difficulty.
The date_added cannot be modified.
"""
class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Code
        fields = ('id','title','content','language','creator','date_added', 'difficulty')
        extra_kwargs = {'date_added': {'read_only': True}}

"""
Serializes code smell model instances.
Returns a JSON serializable datatype with the fields: id, code (code snippet it is labelled for), user (user who labelled it), line, smell (name of the code smell).
"""
class CodeSmellSerializer(serializers.ModelSerializer):
    class Meta:
        model = CodeSmell
        fields = ('id','code','user','line','smell')

"""
Serializes smell model instances (the predetermined list of code smells to choose from).
Returns a JSON serializable datatype with the fields: id, name (name of the code smell).
"""
class SmellSerializer(serializers.ModelSerializer):
    class Meta:
        model = Smell
        fields = ('id','name')

"""
Serializes score model instances.
Returns a JSON serializable datatype with the fields: id, code (code snippet it generated from), user (user who received that score), score.
"""
class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ('id','code','user','score')
