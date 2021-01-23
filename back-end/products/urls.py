from django.urls import path, include



from .views import ProductList, VariantList

urlpatterns = [
    path('api/products/', ProductList.as_view(), name='products-list'),
    path('api/variants/', VariantList.as_view(), name='variants-list')

]