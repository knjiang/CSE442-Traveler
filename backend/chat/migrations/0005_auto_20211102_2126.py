# Generated by Django 3.2.8 on 2021-11-02 21:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0004_alter_messages_creationdate'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='messages',
            options={'ordering': ('-creationDate',)},
        ),
        migrations.AlterField(
            model_name='messages',
            name='creationDate',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
