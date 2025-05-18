# BeardStyle - Sistema de Gestión para Barberías

BeardStyle es una aplicación web completa para barberías, desarrollada con Vue.js en el frontend y Django REST Framework en el backend. Permite a los usuarios registrarse, iniciar sesión, gestionar citas y visualizar información sobre los servicios que ofrece la barbería.

## 📋 Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Configuración del Entorno](#configuración-del-entorno)
5. [Ejecución del Proyecto](#ejecución-del-proyecto)
6. [Integración Frontend-Backend](#integración-frontend-backend)
7. [Arquitectura del Sistema](#arquitectura-del-sistema)
8. [Flujo de Datos](#flujo-de-datos)
9. [Autenticación y Seguridad](#autenticación-y-seguridad)
10. [Gestión de Citas](#gestión-de-citas)
11. [Superusuario y Panel de Administración](#superusuario-y-panel-de-administración)
12. [Mejores Prácticas](#mejores-prácticas)
13. [Resolución de Problemas](#resolución-de-problemas)
14. [Contribuciones](#contribuciones)
15. [Documentación Adicional](#documentación-adicional)
16. [Licencia](#licencia)

## 📂 Estructura del Proyecto

```
pagBeardStyle/
├── backend/                  # API REST en Django
│   ├── barber_app/           # Aplicación principal
│   │   ├── admin.py          # Configuración del panel de administración
│   │   ├── models.py         # Definición de modelos (Usuario, Appointment)
│   │   ├── serializers.py    # Serializadores para la API
│   │   ├── views.py          # Vistas/Controladores de la API
│   │   └── urls.py           # Rutas de la API
│   ├── barbershop/           # Configuración del proyecto Django
│   │   ├── settings.py       # Configuraciones (DB, Auth, CORS, etc.)
│   │   └── urls.py           # Rutas principales
│   ├── manage.py             # Script de gestión Django
│   ├── requirements.txt      # Dependencias Python
│   └── API_README.md         # Documentación específica de la API
├── frontend/                 # Aplicación Vue.js
│   ├── public/               # Archivos públicos estáticos
│   │   └── assets/           # Recursos estáticos (CSS, imágenes)
│   ├── src/                  # Código fuente Vue
│   │   ├── assets/           # Recursos internos
│   │   ├── components/       # Componentes reutilizables
│   │   ├── composables/      # Lógica reutilizable (useAuth, etc.)
│   │   ├── layouts/          # Layouts principales (Header, Footer)
│   │   ├── pages/            # Páginas completas (Citas)
│   │   ├── router/           # Configuración de rutas
│   │   ├── sections/         # Secciones de página (Hero, Servicios)
│   │   ├── services/         # Servicios API (auth, appointments)
│   │   └── views/            # Vistas (Login, Register)
│   ├── .env.local            # Variables de entorno locales
│   ├── package.json          # Dependencias JavaScript
│   └── README.md             # Documentación específica del frontend
└── README.md                 # Este documento
```

## 🛠️ Tecnologías Utilizadas

### Backend

- **Django**: Framework web de Python
- **Django REST Framework**: Biblioteca para construir APIs RESTful
- **SQLite/PostgreSQL**: Base de datos
- **Django CORS Headers**: Para manejo de CORS
- **Django Authentication**: Para autenticación basada en sesión

### Frontend

- **Vue.js**: Framework JavaScript progresivo
- **Vue Router**: Enrutamiento del lado del cliente
- **Axios**: Cliente HTTP para comunicación con la API
- **Bootstrap**: Framework CSS para diseño responsivo
- **FontAwesome**: Iconos vectoriales

## 📋 Requisitos del Sistema

- **Python** 3.8+
- **Node.js** 14+
- **npm** 6+ o yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Base de datos (SQLite para desarrollo, PostgreSQL recomendado para producción)
- 2GB RAM mínimo para desarrollo
- 50MB espacio en disco (excluyendo dependencias)

## ⚙️ Configuración del Entorno

### Backend (Django)

1. **Crear entorno virtual**:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

2. **Instalar dependencias**:

   ```bash
   pip install -r requirements.txt
   ```

3. **Configurar variables de entorno** (crear un archivo `.env` en la carpeta backend):

   ```
   DEBUG=True
   SECRET_KEY=your-secret-key-here
   DATABASE_URL=sqlite:///db.sqlite3
   ALLOWED_HOSTS=localhost,127.0.0.1
   CORS_ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080
   ```

4. **Aplicar migraciones**:

   ```bash
   python manage.py migrate
   ```

5. **Crear superusuario**:

   ```bash
   python manage.py createsuperuser
   ```

   Cuando ejecutes este comando, se te solicitará proporcionar un nombre de usuario, una dirección de correo electrónico y una contraseña para el superusuario. Por ejemplo:

   ```
   Username: admin
   Email: admin@beardstyle.com
   Password: Admin123456
   Password (again): Admin123456
   ```

### Frontend (Vue.js)

1. **Instalar dependencias**:

   ```bash
   cd frontend
   npm install  # o yarn
   ```

2. **Configurar variables de entorno** (crear un archivo `.env.local` en la carpeta frontend):
   ```
   VUE_APP_API_URL=http://localhost:8000/api
   ```

## 🚀 Ejecución del Proyecto

### Desarrollo

1. **Iniciar backend**:

   ```bash
   cd backend
   python manage.py runserver
   ```

   El backend estará disponible en: http://localhost:8000

2. **Iniciar frontend**:

   ```bash
   cd frontend
   npm run serve  # o yarn serve
   ```

   El frontend estará disponible en: http://localhost:8080

3. **Acceso**:
   - **Frontend**: http://localhost:8080
   - **API REST**: http://localhost:8000/api/
   - **Panel Admin**: http://localhost:8000/admin/

### Producción

1. **Backend**:

   ```bash
   cd backend
   python manage.py collectstatic
   gunicorn barbershop.wsgi:application
   ```

2. **Frontend**:
   ```bash
   cd frontend
   npm run build
   ```
   Los archivos compilados se encontrarán en `frontend/dist/`

## 🔄 Integración Frontend-Backend

### Comunicación API

La comunicación entre el frontend y el backend se realiza mediante solicitudes HTTP RESTful:

1. **Servicios API en el Frontend**:

   ```javascript
   // src/services/api.js - Configuración base de Axios
   import axios from "axios";

   const apiClient = axios.create({
     baseURL: process.env.VUE_APP_API_URL,
     withCredentials: true, // Importante para enviar/recibir cookies
     headers: {
       Accept: "application/json",
       "Content-Type": "application/json",
     },
   });

   // Interceptor para manejar tokens CSRF
   apiClient.interceptors.request.use((config) => {
     const csrfToken = getCookie("csrftoken");
     if (csrfToken) {
       config.headers["X-CSRFToken"] = csrfToken;
     }
     return config;
   });

   export default apiClient;
   ```

2. **Servicios Específicos**:

   ```javascript
   // src/services/auth.js
   import apiClient from "./api";

   export default {
     login(credentials) {
       return apiClient.post("/auth/login/", credentials);
     },

     register(userData) {
       return apiClient.post("/auth/register/", userData);
     },

     logout() {
       return apiClient.post("/auth/logout/");
     },
   };
   ```

3. **Composables para Estado Global**:

   ```javascript
   // src/composables/useAuth.js
   import { ref } from "vue";
   import authService from "@/services/auth";

   const user = ref(JSON.parse(localStorage.getItem("user")) || null);

   export default function useAuth() {
     const login = async (credentials) => {
       const response = await authService.login(credentials);
       user.value = response.data;
       localStorage.setItem("user", JSON.stringify(response.data));
       return response;
     };

     // Otras funciones: logout, register, checkAuth...

     return {
       user,
       login,
       // ...otros métodos
     };
   }
   ```

### Autenticación y Sesión

El sistema utiliza autenticación basada en sesión:

1. **Backend**: Django crea una cookie `sessionid` al iniciar sesión.
2. **Frontend**:
   - Envía credenciales a `/api/auth/login/`
   - Almacena datos del usuario en localStorage
   - Incluye cookies en todas las peticiones subsecuentes
   - Actualiza la UI según el estado de autenticación

## 🏗️ Arquitectura del Sistema

```
[Cliente Web]
    │
    ▼
[Vue Router] ─── [Componentes Vue] ─── [Composables (Estado)]
    │                                          │
    │                                          │
    ▼                                          ▼
[Servicios API] ───────────────────────► [Estado Local]
    │
    │ HTTP/REST
    │
    ▼
[Django URLs] ──► [Django Views/Viewsets] ──► [Django Serializers]
    │                      │                           │
    │                      │                           │
    ▼                      ▼                           ▼
[Middlewares] ───► [Authentication] ───────► [Django Models]
                                                      │
                                                      ▼
                                                 [Database]
```

## 📊 Flujo de Datos

### Ejemplo: Crear una Cita

1. **Usuario Interactúa**: Completa formulario de cita
2. **Componente Vue**: Valida datos y llama al servicio API
3. **Servicio API**: Envía solicitud POST a `/api/appointments/`
4. **Django View**: Valida autenticación y datos
5. **Serializer**: Valida y procesa datos
6. **Model**: Guarda datos en la base de datos
7. **Respuesta**: Django devuelve respuesta JSON con datos de la cita
8. **Frontend**: Actualiza UI y muestra notificación

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación

1. **Registro**:

   - POST a `/api/auth/register/` con datos del usuario
   - Backend valida, crea usuario y devuelve datos
   - Frontend redirige a login

2. **Login**:

   - POST a `/api/auth/login/` con credenciales
   - Backend autentica y establece cookie de sesión
   - Frontend guarda datos del usuario en localStorage
   - UI se actualiza según estado de autenticación

3. **Mantenimiento de Sesión**:

   - Backend: Cookie `sessionid` validada en cada petición
   - Frontend: Token CSRF incluido en peticiones no exentas

4. **Logout**:
   - POST a `/api/auth/logout/`
   - Backend invalida la sesión
   - Frontend elimina datos de localStorage

### Seguridad Implementada

- **CSRF Protection**: Tokens CSRF para prevenir ataques Cross-Site Request Forgery
- **CORS**: Configurado para permitir solo orígenes específicos
- **Contraseñas**: Hasheadas en la base de datos usando Django's password hasher
- **Autenticación por Sesión**: Cookies seguras para mantener sesión
- **Validación de Entrada**: Tanto en frontend como backend

## 📅 Gestión de Citas

### Crear Cita

1. Usuario accede a formulario de cita (`/citas`)
2. Selecciona servicio, fecha y hora
3. Frontend valida datos y envía a la API
4. Backend valida y guarda la cita
5. Frontend actualiza la lista de citas

### Editar/Eliminar Cita

1. Usuario selecciona cita existente
2. Puede modificar campos o eliminar la cita
3. API verifica que el usuario sea propietario de la cita
4. Se actualiza o elimina en la base de datos
5. Frontend refleja los cambios

## 👨‍💼 Superusuario y Panel de Administración

### Credenciales por Defecto

Si usas el script de creación de superusuario o el comando `createsuperuser`, configura:

- **Usuario**: `admin`
- **Email**: `admin@beardstyle.com`
- **Contraseña**: `Admin123456`

> ⚠️ **Importante**: Cambia estas credenciales en producción.

### Acceso al Panel de Administración

1. Accede a `http://localhost:8000/admin/`
2. Ingresa las credenciales de superusuario
3. Desde aquí puedes:
   - Gestionar usuarios
   - Ver y editar todas las citas
   - Configurar permisos

## 🌟 Mejores Prácticas

### Desarrollo Frontend

1. **Componentes Reutilizables**: Crear componentes modulares con responsabilidades específicas
2. **Composables para Estado**: Extraer lógica a composables para facilitar la reutilización
3. **Tipado de Datos**: Documentar props y eventos con JSDoc o TypeScript
4. **Manejo de Errores**: Implementar try/catch en llamadas API
5. **Lazy Loading**: Cargar componentes bajo demanda para mejorar rendimiento

### Desarrollo Backend

1. **Serialización de Datos**: Usar serializadores para validación y transformación de datos
2. **Permisos Granulares**: Implementar permisos a nivel de vista/modelo
3. **Paginación**: Implementar para conjuntos grandes de datos
4. **Validación**: Validar datos tanto a nivel de serializer como de modelo
5. **Logs**: Mantener logs detallados para depuración

### Comunicación Frontend-Backend

1. **Formato Estándar**: Usar formato JSON consistente para respuestas
2. **Códigos HTTP**: Usar códigos HTTP apropiados (200, 201, 400, 401, etc.)
3. **Mensajes de Error**: Devolver mensajes claros y accionables
4. **Versionado API**: Considerar prefijos como `/api/v1/` para futuras actualizaciones
5. **Documentación**: Mantener documentación actualizada de endpoints

## 🔍 Resolución de Problemas

### Problemas Comunes

1. **Error CSRF**:

   - Verificar que se envía el token CSRF en las peticiones no exentas
   - Asegurarse de que las cookies se envían correctamente

2. **Error de Autenticación**:

   - Verificar que la sesión está activa
   - Comprobar que las credenciales son correctas
   - Intentar iniciar sesión nuevamente

3. **Problemas CORS**:

   - Verificar que el origen del frontend está permitido en CORS_ALLOWED_ORIGINS
   - Asegurarse de que CORS_ALLOW_CREDENTIALS es True

4. **Citas no aparecen**:
   - Verificar que el usuario está autenticado
   - Comprobar que la petición API es correcta
   - Verificar que el usuario tiene citas asignadas

### Debugging

**Frontend**:

```javascript
// Activar logs solo en desarrollo
if (process.env.NODE_ENV === "development") {
  console.log("Datos enviados:", data);
  console.log("Respuesta API:", response);
}
```

**Backend**:

```python
import logging
logger = logging.getLogger(__name__)

try:
    # Operación
    logger.info(f"Operación exitosa para usuario {request.user}")
except Exception as e:
    logger.error(f"Error: {str(e)}")
```

## 👥 Contribuciones

Para contribuir al proyecto:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

### Estándares de Código

- **Frontend**: Sigue la guía de estilo de Vue.js
- **Backend**: Sigue PEP 8 para Python
- **Commits**: Usa mensajes descriptivos y concisos
- **Documentación**: Documenta nuevas características o cambios

## 📚 Documentación Adicional

- [Documentación del Backend](./backend/API_README.md)
- [Documentación del Frontend](./frontend/README.md)
- [Documentación de Django](https://docs.djangoproject.com/)
- [Documentación de Vue.js](https://vuejs.org/guide/introduction.html)
- [Documentación de Django REST Framework](https://www.django-rest-framework.org/)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

---

## 🧑‍💻 Desarrollador

- **Autor:** LeoniBres
- **Frameworks principales:** Vue.js (frontend), Django REST Framework (backend)
- **Diseño:** Basado en principios modernos de UX/UI para ofrecer una experiencia intuitiva y atractiva
- **Contacto:** [leonibresjimenez@gmail.com](mailto:leonibresjimenez@gmail.com)

¡Gracias por visitar el proyecto! Si tienes sugerencias o encuentras algún problema, no dudes en contribuir o abrir un issue.
