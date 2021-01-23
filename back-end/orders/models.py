from django.db import models

class Order(models.Model):
    first_name = models.CharField(max_length=120, blank=True, null=True)
    last_name = models.CharField(max_length=120, blank=True, null=True)
    firm_name = models.CharField(max_length=120, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=10)
    aadhar = models.CharField(max_length=12, null=True, blank=True)
    gst_number = models.CharField(max_length=30,null=True, blank=True)
    total = models.FloatField()
    gst_percent = models.FloatField()
    discount_percent = models.FloatField()
    discount_amount = models.FloatField(blank=True)
    gst_amount = models.FloatField(blank=True)
    amount = models.FloatField(blank=True)


    def save(self, *args, **kwargs):
        self.discount_amount =  (self.discount_percent / 100) * self.total
        am = self.total - self.discount_amount
        self.gst_amount = am * (self.gst_percent / 100 )
        self.amount = self.total - self.discount_amount + self.gst_amount
        super(Order, self).save(*args, **kwargs)
        if len(Order.objects.all()) > 1:
            pass
        else:   
            self.id += 11000
            super(Order, self).save(*args, **kwargs)

    def __str__(self):
        return '{} {}'.format(self.first_name, self.last_name)

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='orderitems')
    article_number = models.CharField(max_length=12)
    name=models.CharField(max_length = 120)
    category = models.CharField(max_length = 8)
    quantity = models.IntegerField()
    size = models.CharField(max_length=122)
    price = models.FloatField()
    cost = models.FloatField()

    def __str__(self):
        return self.name
