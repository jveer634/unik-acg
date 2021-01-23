from django.test import TestCase

from rest_framework.test import APIRequestFactory

import json

class OrderTest(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_create_order(self):
        request = self.factory.post('api/place-order/', json.dumps(
            {
                'firstName': 'Jay',
                'lastName': 'Veer',
                'firmName': 'LocalHackDay',
                'email': 'jaysparx9@gmail.com',
                'mobile': '8125326992',
                'gstNumber': 'asdfghjklk',
                'aadharNumber': '123456789012',
                'discount_per': 12,
                'gst_per': 21,
                'total': 1234,
                'items' : [
                    {
                        'name': 'Elbow',
                        'size': '25mm(1 in)',
                        'category': 'UNIK',
                        'unitPrice': 12,
                        'quantity': 123
                    },
                    {
                        'name': 'Elbow',
                        'size': '25mm(1 in)',
                        'category': 'UNIK',
                        'unitPrice': 12,
                        'quantity': 123
                    },
                    {
                        'name': 'Elbow',
                        'size': '25mm(1 in)',
                        'category': 'UNIK',
                        'unitPrice': 12,
                        'quantity': 123
                    },
                    {
                        'name': 'Elbow',
                        'size': '25mm(1 in)',
                        'category': 'UNIK',
                        'unitPrice': 12,
                        'quantity': 123
                    },

                ]
        }), content_type='application/json')