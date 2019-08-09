"""Declare models for YOUR_APP app."""

from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.conf import settings

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    """User model."""

    username = None
    email = models.EmailField(_('email address'), unique=True)
    birth_date = models.DateField(null=True, blank=True)
    profile_image = models.ImageField(upload_to='pic_folder/', default='pic_folder/None/no-img.jpg', blank=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

class PeriodPlan(models.Model):

    # Fields
    name = models.CharField(max_length=255)
    number_of_tablets = models.IntegerField()
    number_of_placebo_tablets = models.IntegerField()

    # Relationship Fields
    User = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE, related_name="periodplans",
    )


class YearPlan(models.Model):
    # Relationship Fields
    PeriodPlan = models.OneToOneField(
        'backend_app.PeriodPlan',
        on_delete=models.CASCADE, related_name="yearplans",
    )


class DayPlan(models.Model):

    # Fields
    Date = models.DateField()
    HolidayFlag = models.BooleanField(default=False)
    PeriodDay = models.BooleanField(default=False)
    PlaceboDay = models.BooleanField(default=False)
    TabsDay = models.BooleanField(default=False)

    # Relationship Fields
    YearPlan = models.ForeignKey(
        'backend_app.YearPlan',
        on_delete=models.CASCADE, related_name="dayplans",
    )
