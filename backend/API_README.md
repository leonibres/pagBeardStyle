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
