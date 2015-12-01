# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='code',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='user',
        ),
        migrations.AlterField(
            model_name='code',
            name='date_added',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.DeleteModel(
            name='Comment',
        ),
    ]
