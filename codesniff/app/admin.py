from django.contrib import admin
from app.models import Code, Scores, CodeSmells
# Register your models here.

admin.site.register(Code)
admin.site.register(Scores)
admin.site.register(CodeSmells)

