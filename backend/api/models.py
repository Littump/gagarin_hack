from django.contrib.auth.models import AbstractUser
from django.db import models


class Event(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='events/', blank=True, null=True)
    description = models.TextField()
    date_start = models.DateField()
    date_finish = models.DateField()
    place = models.CharField(max_length=255)
    points = models.IntegerField()
    link = models.URLField()

    KIND_CHOICES = (
        ('event', 'event'),
        ('competition', 'competition'),
        ('education', 'education'),
    )

    kind = models.CharField(max_length=255, choices=KIND_CHOICES)

    class Meta:
        ordering = ['-date_start']


class User(AbstractUser):
    specialization = models.CharField(max_length=255)
    university_group = models.CharField(max_length=255)


class Achievement(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='achievements/', blank=True, null=True)
    date_start = models.DateField()
    date_finish = models.DateField()
    place = models.CharField(max_length=255)
    link = models.URLField()
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='achievements')


class PointUp(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='points_up')


class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    link = models.URLField()


class Test(models.Model):
    name = models.CharField(max_length=255)


class Question(models.Model):
    text = models.TextField()
    number = models.IntegerField()
    is_answer = models.BooleanField()
    test = models.ForeignKey(Test, on_delete=models.CASCADE,
                             related_name='questions')


class UserTest(models.Model):
    is_complete = models.BooleanField(default=False)
    percentage = models.IntegerField(default=0)
    test = models.ForeignKey(Test, on_delete=models.CASCADE,
                             related_name='user_test')
    user = models.ForeignKey(User, on_delete=models.CASCADE,
                             related_name='user_test')
