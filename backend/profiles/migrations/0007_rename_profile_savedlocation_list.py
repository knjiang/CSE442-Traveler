# Generated by Django 3.2.7 on 2021-09-27 03:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0006_savedlocation'),
    ]

    operations = [
        migrations.RenameField(
            model_name='savedlocation',
            old_name='profile',
            new_name='list',
        ),
    ]