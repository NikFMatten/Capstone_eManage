from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass
    '''
    This is a custom version of the built in User class
    It contains all of the built in fields and functionality of the standard User
    You can add fields here for any additional properties you want a User to have
    This is useful for adding roles (Customer and Employee, for example)
    For just a few roles, adding boolean fields is advised
    '''
    # Example (note import of models above that is commented out)
    # this will add a column to the user table
    phone_number = models.CharField(max_length=12)
    dob = models.DateField()
    employee_role = models.CharField(max_length=255)
    salary = models.DecimalField(max_digits=4, decimal_places=2)
    hire_date = models.DateField()
    is_manager = models.BooleanField('manager status', default=False)