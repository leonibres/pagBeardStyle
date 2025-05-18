# BeardStyle - Sistema Integral para Barberías

BeardStyle es una solución web moderna para la gestión de barberías, desarrollada con **Vue.js** en el frontend y **Django REST Framework** en el backend. Permite a los usuarios registrarse, iniciar sesión, reservar y gestionar citas, y visualizar información relevante sobre los servicios ofrecidos.

---

## Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Configuración y Ejecución](#configuración-y-ejecución)
5. [Frontend: Estructura y Detalles](#frontend-estructura-y-detalles)
6. [Backend: Estructura y API](#backend-estructura-y-api)
7. [Integración Frontend-Backend](#integración-frontend-backend)
8. [Autenticación y Seguridad](#autenticación-y-seguridad)
9. [Gestión de Citas](#gestión-de-citas)
10. [Panel de Administración y Superusuario](#panel-de-administración-y-superusuario)
11. [Resolución de Problemas](#resolución-de-problemas)
12. [Contribuciones](#contribuciones)
13. [Licencia](#licencia)
14. [Contacto](#contacto)

---

## 1. Estructura del Proyecto

```
pagBeardStyle/
├── backend/                  # API REST en Django
│   ├── barber_app/           # App principal (modelos, vistas, serializers)
│   ├── barbershop/           # Configuración del proyecto Django
│   ├── manage.py             # Script de gestión Django
│   ├── requirements.txt      # Dependencias Python
│   └── API_README.md         # Documentación de la API
├── frontend/                 # Aplicación Vue.js
│   ├── public/               # Archivos estáticos (CSS, imágenes)
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
│   └── README.md             # Documentación frontend
└── README.md                 # Este documento
```

---

## 2. Tecnologías Utilizadas

**Backend:**

- Django 3.2+
- Django REST Framework
- SQLite (desarrollo) / PostgreSQL (producción)
- Django CORS Headers

**Frontend:**

- Vue.js 3
- Vue Router
- Axios
- Bootstrap 5
- FontAwesome

---

## 3. Requisitos del Sistema

- **Python** 3.8+
- **Node.js** 14+
- **npm** 6+ o yarn
- Navegador moderno (Chrome, Firefox, Edge)
- Base de datos SQLite (desarrollo) o PostgreSQL (producción)

---

## 4. Configuración y Ejecución

### Backend (Django)

1. **Crear entorno virtual y activar:**

   ```bash
   cd backend
   python -m venv venv
   # En Windows:
   venv\Scripts\activate
   # En Linux/Mac:
   source venv/bin/activate
   ```

2. **Instalar dependencias:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configurar variables de entorno** (opcional, recomendado):

   - Crea un archivo `.env` en la carpeta `backend` con:
     ```
     DEBUG=True
     SECRET_KEY=your-secret-key
     DATABASE_URL=sqlite:///db.sqlite3
     ALLOWED_HOSTS=localhost,127.0.0.1
     CORS_ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080
     ```

4. **Aplicar migraciones:**

   ```bash
   python manage.py migrate
   ```

5. **Crear superusuario:**

   ```bash
   python manage.py createsuperuser
   ```

   **Clave recomendada para pruebas:**

   - Usuario: `admin`
   - Email: `admin@beardstyle.com`
   - Contraseña: `Admin123456`

6. **Ejecutar el servidor:**
   ```bash
   python manage.py runserver
   ```
   Acceso: [http://localhost:8000](http://localhost:8000)

---

### Frontend (Vue.js)

1. **Instalar dependencias:**

   ```bash
   cd frontend
   npm install
   ```

2. **Configurar variables de entorno** (opcional):

   - Crea un archivo `.env.local` en la carpeta `frontend`:
     ```
     VUE_APP_API_URL=http://localhost:8000/api
     ```

3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run serve
   ```
   Acceso: [http://localhost:8080](http://localhost:8080)

---

## 5. Frontend: Estructura y Detalles

- **`src/components/`**: Componentes reutilizables (inputs, botones, tarjetas).
- **`src/layouts/`**: Estructura global de la app (Header, Footer).
- **`src/pages/`**: Páginas principales como gestión de citas.
- **`src/views/`**: Vistas de autenticación (Login, Register) y gestión de citas.
- **`src/sections/`**: Secciones de la landing page (Hero, Servicios, Testimonios).
- **`src/services/`**: Servicios para consumir la API (auth, appointments).
- **`src/composables/`**: Lógica reutilizable (ej. useAuth para estado de usuario).
- **`src/router/`**: Configuración de rutas protegidas y públicas.
- **`src/assets/`**: Imágenes, fuentes y estilos globales.

**Ejemplo de flujo de autenticación:**

- El usuario inicia sesión en `/login`.
- El token de sesión y CSRF se almacenan en cookies.
- El estado de usuario se mantiene en localStorage y composables.
- Las rutas protegidas requieren autenticación y redirigen a `/login` si no hay sesión.

---

## 6. Backend: Estructura y API

- **`barber_app/models.py`**: Define los modelos `Usuario` y `Appointment`.
- **`barber_app/serializers.py`**: Serializadores para validar y transformar datos.
- **`barber_app/views.py`**: Vistas API para registro, login, logout y gestión de citas.
- **`barber_app/urls.py`**: Rutas de la API REST.
- **`barbershop/settings.py`**: Configuración de base de datos, CORS, autenticación, etc.

### Principales endpoints de la API

- **Registro:** `POST /api/auth/register/`
- **Login:** `POST /api/auth/login/`
- **Logout:** `POST /api/auth/logout/`
- **Listar/Crear citas:** `GET/POST /api/appointments/`
- **Mis citas:** `GET /api/appointments/my/`
- **Detalle/Editar/Eliminar cita:** `GET/PUT/DELETE /api/appointments/{id}/`

**Ejemplo de creación de cita:**

```json
POST /api/appointments/
{
  "date": "2023-06-25T14:00:00Z",
  "service": "Corte y Barba",
  "status": "pendiente"
}
```

**Respuesta exitosa:**

```json
{
  "id": 3,
  "user": 1,
  "date": "2023-06-25T14:00:00Z",
  "service": "Corte y Barba",
  "status": "pendiente",
  "created_at": "2023-06-16T09:20:00Z"
}
```

**Notas:**

- El usuario debe estar autenticado (cookie de sesión activa).
- El token CSRF debe enviarse en el header `X-CSRFToken` para métodos POST/PUT/DELETE.
- El backend valida que el usuario solo pueda ver y modificar sus propias citas.

---

## 7. Integración Frontend-Backend

La comunicación se realiza mediante Axios, configurado para enviar cookies y el token CSRF en cada petición protegida.

**Ejemplo de configuración base de Axios:**

```js
// src/services/api.js
import axios from "axios";
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
apiClient.interceptors.request.use((config) => {
  const csrfToken = getCookie("csrftoken");
  if (csrfToken) config.headers["X-CSRFToken"] = csrfToken;
  return config;
});
export default apiClient;
```

---

## 8. Autenticación y Seguridad

- **Autenticación por sesión:**  
  El backend usa cookies de sesión (`sessionid`) y protección CSRF (`csrftoken`).
- **CORS:**  
  Configurado para aceptar solo orígenes permitidos.
- **Contraseñas:**  
  Hasheadas en la base de datos.
- **Validación:**  
  Validación de datos tanto en frontend como en backend.

---

## 9. Gestión de Citas

- **Crear cita:**  
  POST a `/api/appointments/` con los campos `date`, `service`, `status`.
- **Listar citas:**  
  GET a `/api/appointments/` o `/api/appointments/my/`.
- **Editar/Eliminar cita:**  
  PUT/DELETE a `/api/appointments/{id}/`.

---

## 10. Panel de Administración y Superusuario

- Acceso: [http://localhost:8000/admin/](http://localhost:8000/admin/)
- Gestiona usuarios, citas y servicios desde la interfaz de Django Admin.
- **Credenciales de superusuario por defecto para pruebas:**
  - Usuario: `admin`
  - Email: `admin@beardstyle.com`
  - Contraseña: `Admin123456`
- **Importante:** Cambia estas credenciales en producción.

---

## 11. Resolución de Problemas

- **Error CSRF:**  
  Verifica que el token CSRF se envía en el header `X-CSRFToken` y que las cookies se envían correctamente.
- **401 Unauthorized:**  
  Asegúrate de que la sesión esté activa.
- **CORS:**  
  Verifica que el origen del frontend esté en `CORS_ALLOWED_ORIGINS`.
- **500 Internal Server Error:**  
  Revisa los logs del backend para detalles.
- **Citas no aparecen:**  
  Verifica que el usuario esté autenticado y que la petición API sea correcta.

---

## 12. Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama para tu feature.
3. Realiza tus cambios siguiendo las buenas prácticas de Django y Vue.
4. Escribe tests para tu código.
5. Envía un Pull Request.

---

## 13. Licencia

Este proyecto está bajo la Licencia MIT.

---

## 14. Contacto

- **Autor:** LeoniBres
- **Email:** leonibresjimenez@gmail.com

¿Tienes sugerencias o encontraste un problema? ¡Contribuye o abre un issue!

---
