"""
URL configuration for event_editor project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from mainpage import views as mainpage_views 
from mainpage.views import ModifyRecordView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('mainpage/event_list/', mainpage_views.event_list, name='event_list'),
    path('mainpage/modify_record/', ModifyRecordView.as_view(), name='modify_record'),
]
