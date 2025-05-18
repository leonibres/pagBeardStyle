<<<<<<< HEAD
# BeardStyle - Plataforma de Gestión para Barberías

BeardStyle es una aplicación web completa para la gestión de barberías, que permite a los clientes reservar citas y a los administradores gestionar servicios, personal y horarios.

## Estructura del Proyecto

El proyecto está organizado en dos partes principales:

```
pagBeardStyle/
├── backend/         # API REST en Django REST Framework
│   ├── barber_app/  # Aplicación principal
│   ├── barbershop/  # Configuración del proyecto Django
│   └── API_README.md # Documentación específica del backend
├── frontend/        # Interfaz de usuario en Vue.js
│   ├── src/         # Código fuente Vue
│   ├── public/      # Archivos públicos
│   └── README.md    # Documentación específica del frontend
└── README.md        # Este archivo
```

## Requisitos Previos

- Python 3.8+
- Node.js 14+
- npm 6+ o yarn
- Base de datos (PostgreSQL recomendado para producción, SQLite para desarrollo)

## Configuración del Entorno

### Backend (Django)

1. Crear entorno virtual:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```

2. Instalar dependencias:
=======
# BeardStyle-Web

**BeardStyle-Web** es una aplicación web para la barbería "Beard & Style", desarrollada con Vue.js (frontend) y Django REST Framework (backend). Permite a los usuarios registrarse, iniciar sesión, gestionar citas, y visualizar información relevante sobre la barbería.

---

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes y Secciones](#componentes-y-secciones)
- [Funcionalidades Principales](#funcionalidades-principales)
- [Gestión de Usuarios y Superusuario](#gestión-de-usuarios-y-superusuario)
- [Pruebas con Postman](#pruebas-con-postman)
- [Configuración y Ejecución](#configuración-y-ejecución)
- [Notas de Seguridad y Producción](#notas-de-seguridad-y-producción)
- [Detalle de la Lógica y Componentes](#detalle-de-la-lógica-y-componentes)
- [Flujo de Autenticación y Sesión](#flujo-de-autenticación-y-sesión)
- [Rutas y Navegación](#rutas-y-navegación)
- [Documentación Detallada de la API - Backend](#documentación-detallada-de-la-api---backend-beardstyle)
- [Créditos](#créditos)

---

## Estructura del Proyecto

```text
pagBeardStyle/
├── backend/
│   ├── barber_app/
│   ├── barbershop/
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── sections/
│   │   ├── views/
│   │   ├── router/
│   │   ├── services/
│   │   └── composables/
│   ├── public/
│   └── README.md
```

---

## Componentes y Secciones

### Layouts

- **Header.vue**  
  Barra de navegación principal. Muestra enlaces a las secciones, acceso/login y menú de usuario autenticado.

  - Lógica: Cambia el menú según el estado de autenticación (`useAuth`).
  - Permite navegación a rutas protegidas y públicas.

- **footer.vue**  
  Pie de página con enlaces a redes sociales, botón para volver arriba y créditos.

### Pages

- **Citas.vue**  
  Panel principal para gestión de citas del usuario autenticado.

  - Permite crear, editar y eliminar citas.
  - Muestra notificaciones de éxito/error.
  - Lógica: Usa `appointmentService` para interactuar con la API.

- **Appointments.vue**  
  (Solo admin) Visualiza todas las citas del sistema.

- **MyAppointments.vue**  
  Muestra solo las citas del usuario autenticado.
  - Permite editar y cancelar citas propias.

### Views

- **Login.vue**  
  Formulario de inicio de sesión.

  - Lógica: Usa el composable `useAuth` para login.
  - Al iniciar sesión, redirige a la ruta protegida deseada.
  - Maneja errores de autenticación y muestra mensajes claros.

- **Register.vue**  
  Formulario de registro de usuario.

  - Valida contraseñas.
  - Llama a `authService.register`.
  - Redirige a login tras registro exitoso.

- **EditAppointment.vue**  
  Edición avanzada de una cita específica (usada en rutas tipo `/edit-appointment/:id`).

### Sections

- **HeroSection.vue**  
  Sección principal de bienvenida con branding y llamado a la acción.
- **ServicioSection.vue**  
  Lista y descripción de servicios ofrecidos.
- **EstiloperfectSection.vue**  
  Llamado a la acción para reservar cita.
- **EnfoqueSection.vue**  
  Filosofía y enfoque de la barbería.
- **NosotrosSection.vue**  
  Historia y valores de la empresa.
- **FaqSection.vue**  
  Preguntas frecuentes.
- **ContactoSection.vue**  
  Formulario de contacto y datos de la barbería.
- **TestimonioSection.vue**  
  Testimonios de clientes.

---

## Funcionalidades Principales

- **Registro de usuario:**  
  Permite crear una cuenta con nombre, apellido, email y contraseña.  
  Valida que el email no esté registrado y que las contraseñas coincidan.

- **Inicio de sesión:**  
  Autenticación con email y contraseña.  
  Manejo de sesión vía cookies y almacenamiento de datos del usuario en localStorage.

- **Gestión de citas:**

  - Crear cita: Selecciona servicio, fecha, hora y estado.
  - Editar cita: Modifica los datos de una cita existente.
  - Eliminar cita: Borra una cita del sistema.
  - Solo el usuario autenticado puede ver y gestionar sus citas.

- **Protección de rutas:**  
  Solo usuarios autenticados pueden acceder a la gestión de citas y rutas protegidas.  
  Si no hay sesión, se redirige automáticamente a `/login`.

- **Navegación reactiva:**  
  El menú cambia automáticamente según el estado de autenticación.

- **Formulario de contacto:**  
  Permite enviar mensajes a la barbería (puedes conectar con backend o solo mostrar info).

- **Testimonios y FAQ:**  
  Información adicional para clientes.

---

## Gestión de Usuarios y Superusuario

### Crear superusuario (admin)

En el backend, ejecuta:

```bash
python manage.py createsuperuser
```

O usa el script incluido:

```bash
python create_superuser.py
```

**Datos por defecto del script:**

- Usuario: `admin`
- Email: `admin@beardstyle.com`
- Contraseña: `Admin123456`

El superusuario puede acceder al panel de administración de Django (`/admin`) para gestionar usuarios y citas.

---

## Pruebas con Postman

### 1. Registro de usuario

- **POST** `/api/auth/register/`
- **Body (JSON):**
  ```json
  {
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com",
    "password": "TuContraseña123"
  }
  ```

### 2. Login

- **POST** `/api/auth/login/`
- **Body (JSON):**
  ```json
  {
    "email": "juan@example.com",
    "password": "TuContraseña123"
  }
  ```
- **Nota:** Guarda la cookie de sesión (`sessionid`) para siguientes peticiones.

### 3. Crear cita

- **POST** `/api/appointments/`
- **Headers:**
  - `X-CSRFToken`: (obtenido de la cookie `csrftoken`)
  - `Cookie`: Incluye `sessionid` y `csrftoken`
- **Body (JSON):**
  ```json
  {
    "service": "Corte de Cabello",
    "date": "2024-06-10T15:00",
    "status": "pendiente"
  }
  ```

### 4. Listar mis citas

- **GET** `/api/appointments/my/`
- **Headers:**
  - `Cookie`: Incluye `sessionid`

### 5. Editar cita

- **PUT** `/api/appointments/{id}/`
- **Headers:**
  - `X-CSRFToken`: (de la cookie)
  - `Cookie`: Incluye `sessionid`
- **Body (JSON):**
  ```json
  {
    "service": "Corte y Barba",
    "date": "2024-06-11T16:00",
    "status": "confirmada"
  }
  ```

### 6. Eliminar cita

- **DELETE** `/api/appointments/{id}/`
- **Headers:**
  - `X-CSRFToken`: (de la cookie)
  - `Cookie`: Incluye `sessionid`

---

## Configuración y Ejecución

1. **Instala dependencias backend:**
>>>>>>> dda9d5c24eaf070dae3f7f3b7713f93e863558cd

   ```bash
   pip install -r requirements.txt
   ```

<<<<<<< HEAD
3. Configurar variables de entorno (crear un archivo `.env`):

   ```
   DEBUG=True
   SECRET_KEY=your-secret-key
   DATABASE_URL=sqlite:///db.sqlite3
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```

4. Aplicar migraciones:

   ```bash
   python manage.py migrate
   ```

5. Crear superusuario:
   ```bash
   python manage.py createsuperuser
   ```

### Frontend (Vue.js)

1. Instalar dependencias:

   ```bash
   cd frontend
   npm install  # o yarn
   ```

2. Configurar variables de entorno (crear un archivo `.env.local`):
   ```
   VUE_APP_API_URL=http://localhost:8000/api
   ```

## Ejecución para Desarrollo

1. Iniciar backend:

   ```bash
   cd backend
   python manage.py runserver
   ```

2. Iniciar frontend (en una nueva terminal):

   ```bash
   cd frontend
   npm run serve  # o yarn serve
   ```

3. Acceder a:
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:8000/api/
   - Admin de Django: http://localhost:8000/admin/

## Integración entre Frontend y Backend

### Comunicación API

El frontend se comunica con el backend mediante peticiones HTTP a la API REST:

1. Los servicios en `frontend/src/services/` encapsulan todas las llamadas API.
2. Se utiliza Axios para realizar peticiones HTTP.
3. La autenticación se maneja mediante cookies de sesión.

### Flujo de Datos

```
[Vue Components] ⟷ [Vuex/State] ⟷ [API Services] ⟷ [Django REST API] ⟷ [Django Models]
```

Para más detalles sobre la implementación de la API y sus endpoints, consulta:

- [Documentación del Backend](./backend/API_README.md)
- [Documentación del Frontend](./frontend/README.md)

## Despliegue en Producción

### Backend

1. Configurar `.env` para producción:

   ```
   DEBUG=False
   SECRET_KEY=una-clave-muy-segura
   DATABASE_URL=postgresql://user:password@localhost/beardstyle
   ALLOWED_HOSTS=tudominio.com,www.tudominio.com
   ```

2. Recopilar archivos estáticos:

   ```bash
   python manage.py collectstatic
   ```

3. Usar Gunicorn como servidor WSGI:

   ```bash
   gunicorn barbershop.wsgi:application
   ```

4. Configurar Nginx como proxy inverso.

### Frontend

1. Construir para producción:

   ```bash
   npm run build
   ```

2. Servir archivos estáticos generados en `dist/` mediante Nginx.

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
=======
2. **Instala dependencias frontend:**

   ```bash
   npm install
   ```

3. **Configura variables de entorno si es necesario.**

4. **Corre migraciones y crea superusuario:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

5. **Inicia el backend:**

   ```bash
   python manage.py runserver 0.0.0.0:8000
   ```

6. **Inicia el frontend:**
   ```bash
   npm run serve
   ```

---

## Notas de Seguridad y Producción

- En producción, configura las cookies como `Secure` y ajusta los orígenes de CORS y CSRF.
- No expongas el superusuario por defecto.
- Usa HTTPS en producción.
- Revisa los logs del backend para errores de autenticación o CSRF.
- Cambia las claves secretas y contraseñas por defecto.

---

## Detalle de la Lógica y Componentes

### Autenticación y Sesión

- **useAuth.js:**

  - Proporciona estado reactivo de usuario y autenticación.
  - Métodos: `login`, `logout`, `register`, `checkAuth`.
  - Guarda el usuario en localStorage y actualiza el estado global.

- **api.js:**

  - Configura Axios para enviar cookies y CSRF automáticamente.
  - Proporciona métodos para login, registro y gestión de citas.

- **router/index.js:**
  - Define rutas públicas y protegidas.
  - Guarda de navegación: si una ruta requiere autenticación y no hay usuario, redirige a `/login`.

### Lógica de Login

- El usuario ingresa email y contraseña.
- Se llama a `useAuth().login`, que hace POST a `/api/auth/login`.
- Si es exitoso, guarda el usuario en localStorage y redirige a la ruta deseada.
- Si falla, muestra mensaje de error.

### Lógica de Registro

- El usuario llena nombre, apellido, email y contraseña.
- Se valida que las contraseñas coincidan.
- Se llama a `authService.register`, que hace POST a `/api/auth/register`.
- Si es exitoso, muestra mensaje y redirige a login.

### Lógica de Citas

- **Crear:**

  - El usuario llena el formulario y envía.
  - Se llama a `appointmentService.create`.
  - Si es exitoso, se recarga la lista y muestra notificación.

- **Editar:**

  - El usuario selecciona una cita y edita los campos.
  - Se llama a `appointmentService.update`.
  - Si es exitoso, se recarga la lista y muestra notificación.

- **Eliminar:**
  - El usuario confirma la eliminación.
  - Se llama a `appointmentService.delete`.
  - Si es exitoso, se recarga la lista y muestra notificación.

### Lógica de Navegación

- El header muestra "Acceder" si no hay sesión, o el menú de usuario si está autenticado.
- El botón "Citas" lleva a `/citas` solo si el usuario está autenticado.
- El botón "Cerrar sesión" elimina los datos de usuario y redirige a inicio.

### Lógica de Secciones

- **HeroSection:**  
  Presenta la marca y llamado a la acción.
- **ServicioSection:**  
  Lista los servicios con iconos y descripciones.
- **NosotrosSection:**  
  Historia y valores de la barbería.
- **FaqSection:**  
  Preguntas frecuentes con acordeón.
- **ContactoSection:**  
  Formulario de contacto y datos de la barbería.
- **TestimonioSection:**  
  Opiniones de clientes.

---

## Flujo de Autenticación y Sesión

1. El usuario se registra o inicia sesión.
2. El backend responde con los datos del usuario y establece la cookie de sesión.
3. El frontend guarda los datos del usuario en localStorage.
4. El estado global (`useAuth`) se actualiza y el header muestra el menú de usuario.
5. Las rutas protegidas solo son accesibles si hay usuario autenticado.
6. Al cerrar sesión, se eliminan los datos y se redirige a inicio.

---

## Rutas y Navegación

- `/` - Página principal (landing)
- `/login` - Formulario de inicio de sesión
- `/register` - Formulario de registro
- `/citas` - Gestión de citas (protegida)
- `/edit-appointment/:id` - Editar cita específica (protegida)
- `/appointments` - Ver todas las citas (admin/protegida)
- `/my-appointments` - Ver mis citas (protegida)
- `/admin` - Panel de administración Django (solo superusuario)

---

# Documentación Detallada de la API - Backend BeardStyle

Este backend está construido con Django y Django REST Framework. Expone una API para autenticación de usuarios y gestión de citas para la barbería "Beard & Style".

---

## Estructura de Carpetas Relevante

- `barber_app/models.py`: Modelos de usuario y cita.
- `barber_app/serializers.py`: Serializadores DRF.
- `barber_app/views.py`: Lógica de endpoints.
- `barber_app/urls.py`: Rutas de la API.
- `barbershop/settings.py`: Configuración global, CORS, CSRF, etc.

---

## Modelos

### Usuario (`Usuario`)

- Hereda de `AbstractUser`.
- Campos:
  - `email`: Email único.
  - `nombre`: Nombre real.
  - `apellido`: Apellido real.
  - `fecha_registro`: Fecha de registro.
  - `username`: Usado para autenticación (igual al email por defecto).

### Cita (`Appointment`)

- Campos:
  - `user`: FK a Usuario.
  - `date`: Fecha y hora de la cita.
  - `service`: Servicio solicitado.
  - `status`: Estado (`pendiente`, `confirmada`, etc.).
  - `created_at`: Fecha de creación.

---

## Serializadores

### UsuarioSerializer

- Serializa los campos principales del usuario.
- Hashea la contraseña al crear usuario.
- Si no se proporciona `username`, lo iguala al email.

### AppointmentSerializer

- Serializa todos los campos de la cita.
- El campo `user` es de solo lectura (se asigna automáticamente).

---

## Vistas y Endpoints

### 1. Registro de usuario

- **Clase:** `RegisterView`
- **URL:** `/api/auth/register/`
- **Método:** `POST`
- **CSRF:** Exento
- **Permisos:** Público
- **Lógica:**
  - Valida que el email y username no existan.
  - Crea usuario con contraseña hasheada.
  - Devuelve datos del usuario creado.

---

### 2. Login

- **Clase:** `LoginView`
- **URL:** `/api/auth/login/`
- **Método:** `POST`
- **CSRF:** Exento
- **Permisos:** Público
- **Lógica:**
  - Busca usuario por email o username.
  - Autentica usando el username real.
  - Si es correcto, inicia sesión y devuelve datos del usuario y la cookie de sesión.

---

### 3. Logout

- **Clase:** `LogoutView`
- **URL:** `/api/auth/logout/`
- **Método:** `POST`
- **CSRF:** Exento
- **Permisos:** Usuario autenticado
- **Lógica:**
  - Cierra la sesión del usuario.

---

### 4. Crear y listar citas

- **Clase:** `AppointmentList`
- **URL:** `/api/appointments/`
- **Métodos:** `GET` (listar), `POST` (crear)
- **CSRF:** Requiere token
- **Permisos:** Usuario autenticado
- **Lógica:**
  - GET: Devuelve solo las citas del usuario autenticado.
  - POST: Crea una cita para el usuario autenticado.

---

### 5. Ver, editar y eliminar cita específica

- **Clase:** `AppointmentDetail`
- **URL:** `/api/appointments/<id>/`
- **Métodos:** `GET`, `PUT`, `DELETE`
- **CSRF:** Requiere token
- **Permisos:** Usuario autenticado
- **Lógica:**
  - Solo permite acceder a citas propias.
  - PUT: Actualiza los campos de la cita.
  - DELETE: Elimina la cita.

---

### 6. Listar solo mis citas

- **Clase:** `MyAppointments`
- **URL:** `/api/appointments/my/`
- **Método:** `GET`
- **CSRF:** Requiere token
- **Permisos:** Usuario autenticado
- **Lógica:**
  - Devuelve solo las citas del usuario autenticado.

---

### 7. API Root

- **Función:** `api_root`
- **URL:** `/api/`
- **Método:** `GET`
- **Lógica:**
  - Devuelve los endpoints principales de la API.

---

## Seguridad

- **CORS:**  
  Configurado para aceptar solo orígenes permitidos (localhost y la IP local).
- **CSRF:**
  - Exento solo en login, logout y registro.
  - Requerido en endpoints de citas.
- **Autenticación:**
  - Basada en sesión (`SessionAuthentication`).
  - El usuario debe estar autenticado para gestionar citas.

---

## Ejemplo de Flujo de Autenticación

1. **Registro:**  
   POST a `/api/auth/register/` con datos del usuario.
2. **Login:**  
   POST a `/api/auth/login/` con email y contraseña.  
   Guarda la cookie de sesión.
3. **Crear cita:**  
   POST a `/api/appointments/` con los datos de la cita, enviando la cookie de sesión y el token CSRF.
4. **Listar citas:**  
   GET a `/api/appointments/my/` con la cookie de sesión.

---

## Notas

- El superusuario puede acceder al panel `/admin` para gestionar usuarios y citas.
- Para pruebas con Postman, asegúrate de manejar cookies y CSRF correctamente.
- Puedes extender la API agregando más endpoints o permisos según necesidades.

---
>>>>>>> dda9d5c24eaf070dae3f7f3b7713f93e863558cd

## Créditos

- **Desarrollador:** LeoniBres
- **Frameworks:** Vue.js, Django REST Framework
- **Diseño:** Inspirado en prácticas modernas de UX/UI
<<<<<<< HEAD
=======

---
>>>>>>> dda9d5c24eaf070dae3f7f3b7713f93e863558cd
