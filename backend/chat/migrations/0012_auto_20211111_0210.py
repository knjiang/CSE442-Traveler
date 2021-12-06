# Generated by Django 3.2.8 on 2021-11-11 02:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0019_merge_0016_profile_visited_0018_listdescriptions'),
        ('chat', '0011_lastsentgroup'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='groupchat',
            name='users',
        ),
        migrations.AddField(
            model_name='groupchat',
            name='users',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='gc_users', to='profiles.profile'),
        ),
        migrations.CreateModel(
            name='GroupChatMessages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('messages', models.TextField(default='', max_length=60)),
                ('creationDate', models.DateTimeField(auto_now_add=True)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gc_message_sender', to='profiles.profile')),
            ],
            options={
                'ordering': ('creationDate',),
            },
        ),
        migrations.AddField(
            model_name='groupchat',
            name='messages',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, related_name='gc_message', to='chat.groupchatmessages'),
        ),
    ]