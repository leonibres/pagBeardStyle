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

   ```bash
   pip install -r requirements.txt
   ```

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

## Créditos

- **Desarrollador:** LeoniBres
- **Frameworks:** Vue.js, Django REST Framework
- **Diseño:** Inspirado en prácticas modernas de UX/UI
