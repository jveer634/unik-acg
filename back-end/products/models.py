from django.db import models

from django.urls import reverse


CATEGORY_CHOICES = [
    ("UNIK", "UNIK"),
    ('ACG ISI', 'ACG ISI'),
    ('ACG UNIK', 'ACG UNIK')
]

class Product(models.Model):
    name=models.CharField(max_length = 120)
    art_number = models.CharField(max_length=10)
    image = models.ImageField(upload_to='images/')
    is_reducing = models.BooleanField(default=False)
    category = models.CharField(choices = CATEGORY_CHOICES, max_length = 8)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.name

    # def get_absolute_url(self):
    #     return reverse('product-detail', kwargs={"pk":pk})

class Variant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    size = models.CharField(max_length=120)
    reduced_size = models.CharField(max_length=120)
    price = models.FloatField()
    
    def __str__(self):
        return self.size

    # def get_absolute_url(self):
    #     return reverse("Variant_detail", kwargs={"pk": self.pk})
