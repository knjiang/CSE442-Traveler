# Generated by Django 3.2.8 on 2021-11-02 20:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('profiles', '0018_listdescriptions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Messages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('messages', models.TextField(default='', max_length=30)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_receiver', to='profiles.profile')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='message_sender', to='profiles.profile')),
            ],
        ),
    ]
