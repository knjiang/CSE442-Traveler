# Generated by Django 3.2.7 on 2021-09-27 03:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_alter_profile_from_location'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Location',
            new_name='List',
        ),
    ]
