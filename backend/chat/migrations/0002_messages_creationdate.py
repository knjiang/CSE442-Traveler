# Generated by Django 3.2.8 on 2021-11-02 21:16

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='messages',
            name='creationDate',
            field=models.DateTimeField(auto_now_add=True, default=datetime.datetime(2021, 11, 2, 21, 16, 27, 887219, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
