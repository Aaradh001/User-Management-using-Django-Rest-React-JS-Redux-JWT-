from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MyTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import *
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import AuthenticationFailed,ParseError
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth import get_user_model
from rest_framework.generics import ListCreateAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from rest_framework.generics import RetrieveAPIView
from rest_framework.generics import UpdateAPIView

User = get_user_model()
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



class GetAccountRoutes(APIView):
    def get(self, request, format = None):
        routes = [
            'api/accounts/login',
            'api/accounts/register',
        ]
        return Response(routes)

# ==========Sign up=========

class RegisterView(APIView):
    def post(self,request):
        print("dhfudgs")
        serializer = UserRegisterSerializer(data=request.data)
        print('wr872y3euirfew')
        print(serializer)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE,)  

        content ={'Message':'User Registered Successfully'}
        return Response(content,status=status.HTTP_201_CREATED,)
    

class LoginView(APIView):
    def post(self,request):
        try:
            email = request.data['email']
            password =request.data['password']
            print("gfdsgfdkusgkhlki1234554321")
        

        except KeyError:
            raise ParseError('All Fields Are Required')
        

        if not User.objects.filter(email=email).exists():
            raise AuthenticationFailed('Invalid Email Address')
        
        
        if not User.objects.filter(email=email,is_active=True).exists():
            raise AuthenticationFailed('You are blocked by admin ! Please contact admin')
        
        user = authenticate(username=email,password=password)
        if user is None:
            raise AuthenticationFailed('Invalid Password')
        
        refresh = RefreshToken.for_user(user)
        refresh["first_name"] = str(user.first_name)
        content = {
                     'refresh': str(refresh),
                     'access': str(refresh.access_token),
                     'isAdmin': user.is_superadmin,
                }
        
        return Response(content, status=status.HTTP_200_OK)



class AdminUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = User.objects.get(id = request.user.id)
        data = UserSerializer(user).data
    
        content = data
        return Response(content)




class UserDetails(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        print("hiiiiiiiiiiiiiiii",request.user)
        user = User.objects.get(id=request.user.id)
       
        data = UserSerializer(user).data
        try :
            profile_pic = user.profile_pic
            data['profile_pic'] = request.build_absolute_uri('/')[:-1]+profile_pic.url
        except:
            profile_pic = ''
            data['profile_pic']=''
            
        content = data
        return Response(content)


class UserDetailsUpdate(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        user = User.objects.get(id = request.user.id)

        user_update_details_serializer = UserDetailsUpdateSerializer(
            user, data=request.data, partial=True
        )
        if not request.FILES:
            user_update_details_serializer.fields.pop('profile_pic',None)
        print('reached3')
        if user_update_details_serializer.is_valid():
            print('reached4')
           
            user_update_details_serializer.save()
            return Response(user_update_details_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', user_update_details_serializer.errors)
            return Response(user_update_details_serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class AdminUserListCreateView(ListCreateAPIView):
    queryset = User.objects.all().order_by('-date_joined')  
    serializer_class = AdminUseCreateSerializer
    pagination_class = PageNumberPagination
    filter_backends = [SearchFilter]
    search_fields = ['first_name', 'last_name', 'email', 'phone_number']

class AdminUserRetrieveView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = AdminUseCreateSerializer
    lookup_field = 'id'
    
class AdminUserUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer
    lookup_field = 'id'
    
class AdminUserDeleteView(APIView):
    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)