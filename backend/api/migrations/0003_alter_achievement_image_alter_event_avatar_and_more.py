# Generated by Django 4.2 on 2024-04-13 17:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_service_test_question'),
    ]

    operations = [
        migrations.AlterField(
            model_name='achievement',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='achievements/'),
        ),
        migrations.AlterField(
            model_name='event',
            name='avatar',
            field=models.ImageField(blank=True, null=True, upload_to='events/'),
        ),
        migrations.AlterField(
            model_name='service',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='services/'),
        ),
        migrations.CreateModel(
            name='UserTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('is_complete', models.BooleanField(default=False)),
                ('percentage', models.IntegerField(default=0)),
                ('test', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_test', to='api.test')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_test', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]