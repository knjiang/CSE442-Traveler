# Generated by Django 3.2.7 on 2021-10-22 19:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0015_merge_0014_merge_20211017_2054_0014_shareablelink'),
    ]

    operations = [
        migrations.CreateModel(
            name='ListDescription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=60)),
                ('list', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='profiles.locationlist')),
            ],
        ),
    ]