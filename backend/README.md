# Backend Beard & Style

Backend para la aplicación de gestión de citas de barbería Beard & Style.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB con Mongoose
- JWT para autenticación
- Winston para logging
- Nodemailer para envío de correos

## Estructura del Proyecto

```
backend/
├── src/
│   ├── config/         # Configuraciones (DB, etc.)
│   ├── controllers/    # Controladores
│   ├── middleware/     # Middlewares
│   ├── models/         # Modelos de Mongoose
│   ├── routes/         # Rutas de la API
│   ├── utils/          # Utilidades
│   └── index.js        # Punto de entrada
├── logs/              # Archivos de log
└── package.json
```

## Configuración

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Crear archivo .env con las siguientes variables:
   ```
   PORT=8000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/beardstyle
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_password
   FRONTEND_URL=http://localhost:8080
   ```

3. Iniciar el servidor:
   ```bash
   # Desarrollo
   npm run dev

   # Producción
   npm start
   ```

## API Endpoints

### Autenticación

- POST /api/auth/register - Registro de usuario
- POST /api/auth/login - Inicio de sesión
- GET /api/auth/me - Obtener perfil del usuario autenticado

### Citas

- GET /api/appointments - Listar citas (con filtros)
- POST /api/appointments - Crear nueva cita
- GET /api/appointments/:id - Obtener una cita específica
- PATCH /api/appointments/:id - Actualizar una cita
- PATCH /api/appointments/:id/cancel - Cancelar una cita

### Servicios

- GET /api/services - Listar servicios
- GET /api/services/:id - Obtener un servicio específico
- POST /api/services - Crear nuevo servicio (admin)
- PATCH /api/services/:id - Actualizar servicio (admin)
- DELETE /api/services/:id - Desactivar servicio (admin)

## Características

- Autenticación JWT
- Roles de usuario (client/admin)
- Validación de datos
- Manejo de errores centralizado
- Logging de operaciones
- CORS configurado
- Paginación de resultados
- Filtrado de citas por estado y fecha
- Protección de rutas por rol

## Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT para autenticación
- Protección contra inyección NoSQL
- Validación de datos de entrada
- Headers de seguridad configurados
- Rate limiting para prevenir ataques de fuerza bruta 