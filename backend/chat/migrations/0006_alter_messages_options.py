# Generated by Django 3.2.8 on 2021-11-03 03:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0005_auto_20211102_2126'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='messages',
            options={'ordering': ('creationDate',)},
        ),
    ]