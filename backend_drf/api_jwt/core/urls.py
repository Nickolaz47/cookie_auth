from django.urls import path

from dj_rest_auth.views import LogoutView

from api_jwt.core.views import MyRefreshViewWithCookieSupport, get_user_info, MyLoginView, register


urlpatterns = [
    path('login', MyLoginView.as_view(), name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('token/refresh', MyRefreshViewWithCookieSupport.as_view(), name='token_refresh'),
    path('<uuid:user_id>/info', get_user_info, name='get_user_info'),
    path('register', register, name='register'),
]