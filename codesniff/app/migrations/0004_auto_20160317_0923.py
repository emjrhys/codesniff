# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_auto_20160220_0545'),
    ]

    operations = [
        migrations.CreateModel(
            name='Smell',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.TextField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='code',
            name='difficulty',
            field=models.IntegerField(default=0),
            preserve_default=True,
        ),
    ]
