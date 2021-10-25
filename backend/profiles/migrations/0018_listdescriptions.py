# Generated by Django 3.2.7 on 2021-10-24 21:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0017_delete_listdescription'),
    ]

    operations = [
        migrations.CreateModel(
            name='ListDescriptions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(max_length=30)),
                ('list', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='profiles.locationlist')),
            ],
        ),
    ]
