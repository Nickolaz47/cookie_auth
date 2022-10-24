from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.views import LoginView
from rest_framework import status
from dj_rest_auth.jwt_auth import set_jwt_cookies, set_jwt_refresh_cookie, set_jwt_access_cookie, CookieTokenRefreshSerializer
from rest_framework_simplejwt.settings import api_settings as jwt_settings
from rest_framework_simplejwt.views import TokenRefreshView
from django.utils import timezone
from django.contrib.auth import get_user_model
from dj_rest_auth.utils import jwt_encode


User = get_user_model()


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_info(request, user_id):
    user = request.user
    return Response({'uuid': user.uuid, 'email': user.email, 'name': user.name})


@api_view(['POST'])
def register(request):

    data = request.data

    name =  data['name']
    email =  data['email']
    password1 = data['password']
    password2 = data['confirmPassword']

    if password1 != password2:
        return Response(data={'error': 'Password do not match'}, status=status.HTTP_400_BAD_REQUEST)


    user = User.objects.create(email=email, name=name, password=password1)

    access_token, refresh_token = jwt_encode(user)

    response = Response(data={'id': user.uuid}, status=status.HTTP_200_OK)

    set_jwt_cookies(response, access_token, refresh_token)
    return response



class MyLoginView(LoginView):

    def get_response(self):
        data = {'id': self.user.uuid, 'message': 'Login success'}

        response = Response(data, status=status.HTTP_200_OK)
        set_jwt_cookies(response, self.access_token, self.refresh_token)
        return response


class MyRefreshViewWithCookieSupport(TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.status_code == 200 and 'access' in response.data:
            set_jwt_access_cookie(response, response.data['access'])
            response.data.pop('access')
            response.data['access_token_expiration'] = (timezone.now() + jwt_settings.ACCESS_TOKEN_LIFETIME)
        if response.status_code == 200 and 'refresh' in response.data:
            set_jwt_refresh_cookie(response, response.data['refresh'])
        return super().finalize_response(request, response, *args, **kwargs)