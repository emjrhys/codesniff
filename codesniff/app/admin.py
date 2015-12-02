from django.contrib import admin
from app.models import Code, Score, CodeSmell
# Register your models here.

admin.site.register(Code)
admin.site.register(Score)
admin.site.register(CodeSmell)

