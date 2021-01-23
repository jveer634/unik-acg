from django.contrib import admin

# Register your models here.
from .models import Order, OrderItem

class OrderItemAdmin(admin.TabularInline):
    model = OrderItem

class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemAdmin,]

admin.site.register(Order, OrderAdmin)