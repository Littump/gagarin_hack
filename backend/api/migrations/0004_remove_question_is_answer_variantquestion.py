# Generated by Django 4.2 on 2024-04-13 18:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_achievement_image_alter_event_avatar_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='question',
            name='is_answer',
        ),
        migrations.CreateModel(
            name='VariantQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
                ('is_answer', models.BooleanField()),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variants', to='api.question')),
            ],
        ),
    ]
