# Generated by Django 4.2 on 2024-04-13 23:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_question_is_answer_variantquestion'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='embeding_vector',
            field=models.CharField(blank=True, max_length=2047, null=True),
        ),
    ]