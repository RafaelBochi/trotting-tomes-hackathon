# Generated by Django 4.2.4 on 2023-08-16 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuario', '0009_usuario_password_reset_token_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='password_reset_token',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
    ]