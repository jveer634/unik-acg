from django.contrib import admin

from .models import Product, Variant

# admin.site.register(Variant)

class VariantAdmin(admin.TabularInline):
    model = Variant


class ProductAdmin(admin.ModelAdmin):
    inlines = [VariantAdmin, ]

admin.site.register(Product, ProductAdmin)