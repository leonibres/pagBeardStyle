from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.reverse import reverse
from .serializers import UsuarioSerializer, AppointmentSerializer
from .models import Usuario, Appointment
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

@api_view(['GET'])
@permission_classes([AllowAny])
def api_root(request, format=None):
    return Response({
        'register': reverse('register', request=request, format=format),
        'login': reverse('login', request=request, format=format),
        'logout': reverse('logout', request=request, format=format),
        'appointments': reverse('appointment-list', request=request, format=format),
        'my-appointments': reverse('my-appointments', request=request, format=format),
    })

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        print("Datos de registro recibidos:", request.data)
        data = request.data.copy()
        
        # Garantizar que username es igual a email si no se envió
        if not data.get('username') and data.get('email'):
            data['username'] = data.get('email')
        
        try:
            # Validar si ya existe el email
            if Usuario.objects.filter(email=data.get('email')).exists():
                return Response({
                    'email': ['Este correo electrónico ya está en uso.']
                }, status=status.HTTP_400_BAD_REQUEST)
            
            # Validar si ya existe el username
            if Usuario.objects.filter(username=data.get('username')).exists():
                return Response({
                    'username': ['Este nombre de usuario ya está en uso.']
                }, status=status.HTTP_400_BAD_REQUEST)
                
            serializer = UsuarioSerializer(data=data)
            if serializer.is_valid():
                user = serializer.save()
                return Response({
                    'message': 'Usuario registrado exitosamente',
                    'user': UsuarioSerializer(user).data
                }, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            print("Error en registro:", str(e))
            return Response({
                'detail': f'Error en el servidor: {str(e)}'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    # Agregar método OPTIONS para manejar preflight CORS
    def options(self, request, *args, **kwargs):
        response = Response()
        response["Allow"] = "POST, OPTIONS"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        print("Received login data:", request.data)
        # Aceptamos tanto username como email para mayor flexibilidad
        email = request.data.get('email') or request.data.get('username')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                'error': 'Por favor proporcione email y contraseña'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            email = email.strip()
            # Primero intentamos buscar por email
            try:
                user = Usuario.objects.get(email=email)
            except Usuario.DoesNotExist:
                # Si no existe, intentamos por username
                try:
                    user = Usuario.objects.get(username=email)
                except Usuario.DoesNotExist:
                    raise
                
            auth_user = authenticate(request, username=user.username, password=password)
            
            if auth_user:
                login(request, auth_user)
                return Response({
                    'message': 'Login exitoso',
                    'user': UsuarioSerializer(auth_user).data,
                    'token': 'token-temporal'
                })
            return Response({
                'error': 'Contraseña incorrecta'
            }, status=status.HTTP_401_UNAUTHORIZED)
        except Usuario.DoesNotExist:
            return Response({
                'error': 'No existe un usuario con ese email'
            }, status=status.HTTP_404_NOT_FOUND)
    
    # Agregar método OPTIONS para manejar preflight requests correctamente
    def options(self, request, *args, **kwargs):
        response = Response()
        response["Allow"] = "POST, OPTIONS"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        return response

@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Sesión cerrada exitosamente'})

class AppointmentList(generics.ListCreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

class AppointmentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

class MyAppointments(generics.ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)
