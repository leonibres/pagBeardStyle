# BeardStyle - Sistema Integral para Barberías

BeardStyle es una solución web moderna para la gestión de barberías, desarrollada con **Vue.js** en el frontend y **Django REST Framework** en el backend. Permite a los usuarios registrarse, iniciar sesión, reservar y gestionar citas, y visualizar información relevante sobre los servicios ofrecidos.

---

## Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Requisitos del Sistema](#requisitos-del-sistema)
4. [Guía Rápida: Cómo Iniciar el Backend y el Frontend](#guía-rápida-cómo-iniciar-el-backend-y-el-frontend)
5. [Acceso a los Servidores](#acceso-a-los-servidores)
6. [Documentación del Backend](#documentación-del-backend)
7. [Documentación del Frontend](#documentación-del-frontend)
8. [Documentación de la API](#documentación-de-la-api)
9. [Resolución de Problemas](#resolución-de-problemas)
10. [Contribuciones](#contribuciones)
11. [Licencia](#licencia)
12. [Contacto](#contacto)

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
└── README.md                 # Este documento principal
```

---

## 2. Tecnologías Utilizadas

**Backend:**

- Django 4.2+
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

- **Python** 3.8+ (recomendado 3.12 o inferior para compatibilidad)
- **Node.js** 14+
- **npm** 6+ o yarn
- Navegador moderno (Chrome, Firefox, Edge)
- Base de datos SQLite (desarrollo) o PostgreSQL (producción)

---

## 4. Guía Rápida: Cómo Iniciar el Backend y el Frontend

### Iniciar el Backend (Django)

1. Abre una terminal y navega a la carpeta `backend`:
   ```bash
   cd backend
   ```

2. Crea y activa el entorno virtual:
   ```bash
   python -m venv venv
   # En Windows:
   .\venv\Scripts\activate
   # En Linux/Mac:
   source venv/bin/activate
   ```

3. Instala las dependencias:
   ```bash
   pip install -r requirements.txt
   ```

4. Aplica migraciones:
   ```bash
   python manage.py migrate
   ```

5. (Opcional) Crea un superusuario:
   ```bash
   python manage.py createsuperuser
   ```

6. Inicia el servidor de desarrollo:
   ```bash
   python manage.py runserver
   ```

### Iniciar el Frontend (Vue.js)

1. Abre otra terminal y navega a la carpeta `frontend`:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run serve
   ```

---

## 5. Acceso a los Servidores

- **Backend (Django):**  
  [http://localhost:8000](http://localhost:8000)  
  (Panel de administración: [http://localhost:8000/admin/](http://localhost:8000/admin/))

- **Frontend (Vue.js):**  
  [http://localhost:8080](http://localhost:8080)

---

## 6. Documentación del Backend

- Código fuente en `backend/barber_app/` y `backend/barbershop/`.
- Configuración principal en `backend/barbershop/settings.py`.
- Modelos, vistas, serializadores y rutas bien organizados y documentados.
- Para más detalles técnicos, consulta `backend/API_README.md`.

---

## 7. Documentación del Frontend

- Código fuente en `frontend/src/`.
- Estructura modular: componentes, layouts, secciones, servicios y rutas.
- Uso de Vue Router para navegación y Axios para consumo de la API.
- Estilos personalizados en `frontend/public/assets/css/styles.css`.
- Para detalles de componentes y estructura, revisa los comentarios en cada archivo `.vue` y `.js`.

---

## 8. Documentación de la API

- Consulta el archivo [`backend/API_README.md`](backend/API_README.md) para:
  - Modelos de datos
  - Endpoints disponibles
  - Ejemplos de peticiones y respuestas
  - Seguridad (CORS, CSRF, autenticación)
  - Guía de extensión y testing

---

## 9. Resolución de Problemas

- **Error CSRF:**  
  Asegúrate de enviar el token CSRF en el header `X-CSRFToken` y que las cookies se envían correctamente.
- **401 Unauthorized:**  
  Verifica que la sesión esté activa y que el usuario esté autenticado.
- **CORS:**  
  Confirma que el origen del frontend esté en `CORS_ALLOWED_ORIGINS` en el backend.
- **Problemas con dependencias:**  
  Usa Python 3.12 o inferior para evitar incompatibilidades con algunos paquetes.
- **Citas no aparecen:**  
  Verifica autenticación y revisa la consola del navegador y los logs del backend.

---

## 10. Contribuciones

1. Haz un fork del repositorio.
2. Crea una rama para tu feature.
3. Realiza tus cambios siguiendo las buenas prácticas de Django y Vue.
4. Escribe tests para tu código.
5. Envía un Pull Request.

---

## 11. Licencia

Este proyecto está bajo la Licencia MIT.

---

## 12. Contacto

- **Autor:** LeoniBres
- **Email:** leonibresjimenez@gmail.com

¿Tienes sugerencias o encontraste un problema? ¡Contribuye o abre un issue!

---
