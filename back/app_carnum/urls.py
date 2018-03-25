from django.urls import path, re_path
from app_carnum.views import list_all, item


# django2 needs this for namespaces to work
app_name = 'app_carnum'

urlpatterns = [
    path('', list_all),
    path('item/<int:id>/', item),
    path('item/', item),  # POST
]
