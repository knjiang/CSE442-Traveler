# Generated by Django 3.2.8 on 2021-11-09 01:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0019_merge_0016_profile_visited_0018_listdescriptions'),
        ('chat', '0008_auto_20211105_0051'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupChat',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('users', models.ManyToManyField(to='profiles.Profile')),
            ],
        ),
    ]