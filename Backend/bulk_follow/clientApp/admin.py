from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import*

from .models import User


class UserAdmin(BaseUserAdmin):

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email', 'username','userRole', 'is_admin')
    list_filter = ('is_admin','userRole')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('username' , 'balance')}),
        ('Permissions', {'fields': ('is_admin', 'userRole')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username','userRole','balance', 'password1', 'password2'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


class TwitchOrderAdmin(admin.ModelAdmin):
    list_display=('channelName' , 'apiOrderId' , 'status')

# Now register the new UserAdmin...
admin.site.register(User, UserAdmin)
admin.site.register(PaymentDetail)
admin.site.register(TwitchOrder , TwitchOrderAdmin)
admin.site.register(UserSupport)

