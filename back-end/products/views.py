from django.shortcuts import render

from rest_framework.generics import ListAPIView

from .models import Product, Variant
from .serializers import ProductSerializer, VariantSerializer

class VariantList(ListAPIView):
    queryset = Variant.objects.all()
    serializer_class = VariantSerializer


class ProductList(ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

