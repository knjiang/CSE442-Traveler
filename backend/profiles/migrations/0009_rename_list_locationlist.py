# Generated by Django 3.2.7 on 2021-09-27 06:00

from django.db import migrations


class Migration(migrations.Migration):
    atomic = False
    dependencies = [
        ('profiles', '0008_alter_savedlocation_name'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='List',
            new_name='LocationList',
        ),
    ]
