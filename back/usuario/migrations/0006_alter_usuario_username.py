# Generated by Django 4.2.2 on 2023-06-26 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0005_alter_usuario_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='username',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
