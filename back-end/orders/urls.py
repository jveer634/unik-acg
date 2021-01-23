from django.urls import path

from .views import PlaceOrder


urlpatterns = [
    path('api/place-order/', PlaceOrder.as_view(), name='place-order'),
    # path('api/pdf/', render_pdf, name='pdf'),
    # path('api/pdf2/', render_pdf, name='pdf'),

]
