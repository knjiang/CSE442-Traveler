# Generated by Django 3.2.8 on 2021-11-11 02:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0019_merge_0016_profile_visited_0018_listdescriptions'),
        ('chat', '0013_auto_20211111_0218'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupchat',
            name='users',
            field=models.ManyToManyField(to='profiles.Profile'),
        ),
    ]
