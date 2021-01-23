import math

from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import TemplateView


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


from .models import Order, OrderItem
from .utils import render_to_pdf



from django.http import HttpResponse
from django.template.loader import get_template
from xhtml2pdf import pisa


DEALER_EMAIL = settings.DEALER_EMAIL

class PlaceOrder(APIView):
    def post(self, request, format=None):
        data = request.data
        order = Order.objects.create(
            first_name = data['firstName'],
            last_name = data['lastName'],
            email = data['email'],
            phone = data['phone'],
            firm_name = data['firmName'],
            aadhar = data['aadharNumber'],
            gst_percent = int(data['gstPer']),
            discount_percent = int(data['discountPer']),
            total= data['total'],
            gst_number = data['gstNumber'],
        )
        for item in data['orderitems']:
            item = OrderItem.objects.create(
                order=order,
                name = item['name'],
                category = item['category'],
                size = item['size'],
                price = item['unitPrice'],
                quantity = item['quantity'],
                cost = item['quantity'] * item['unitPrice'],
                article_number = item['articleNumber'],
                )
        output = f'''To
            \nMr. {order.first_name} {order.last_name},
            \n{order.firm_name}.
            \nGST No. {order.gst_number}
            \nWe are are sending this mail to acknowledge your order we received. We will be confirming your order soon. Please find the order details below\n
            \n ORDER DETAILS : '''
        i = 1
        for item in order.orderitems.all():
            output += f'''\n{i} - ({item.article_number}) {item.name} - {item.category} - {item.size} - {item.quantity}pc @ {item.price} -- Rs.{item.cost}/-
            '''
            i += 1

        output += f'''
            \nTotal : {order.total}
            \nDiscount : {order.discount_percent}% -  Rs.{round(order.discount_amount, 2)}/-
            \nGST : {order.gst_percent}%  - Rs.{round(order.gst_amount, 2)}/-
            \nFinal Amount : Rs.{round(order.amount, 2)}/-
            \n
            \nMany Thanks,
            \nUNIK ACG
        '''
        email = EmailMessage(
            subject=f'Order Confirmation #{order.id}',
            body= output,
            from_email='orderform.unikacg@gmail.com',
            to=[order.email],
            # cc=[DEALER_EMAIL]
            
        )
        
        
        email.send()
        return Response('Done...', status=status.HTTP_201_CREATED)

    def get(self, request):
        orders = Order.objects.all()        
        return Response('done')

