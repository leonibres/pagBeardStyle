# BeardStyle-Web

**BeardStyle-Web** es una página web diseñada para la barbería "Beard & Style". Su objetivo es proporcionar una experiencia interactiva y moderna para los usuarios, permitiéndoles explorar servicios, reservar citas, conocer más sobre la barbería y contactarse fácilmente.

---

## Configuración del Proyecto

### Instalación de Dependencias

Para instalar las dependencias necesarias, ejecuta el siguiente comando:

```bash
npm install
```

### Compilación y Recarga Automática para Desarrollo

Para iniciar un servidor de desarrollo con recarga automática, utiliza:

```bash
npm run serve
```

### Compilación y Minificación para Producción

Para compilar el proyecto para producción, ejecuta:

```bash
npm run build
```

### Linter y Corrección de Archivos

Para ejecutar el linter y corregir problemas de estilo automáticamente:

```bash
npm run lint
```

### Personalización de Configuración

Consulta la [Referencia de Configuración](https://cli.vuejs.org/config/) para personalizar la configuración del proyecto.

---

## Estructura del Proyecto

> **NOTA:** Todos los estilos globales y de secciones principales deben definirse en `src/assets/styles/global.css` usando la convención `.contacto-section`, `.servicio-section`, `.faq-section`, etc.  
> No dupliques reglas en `public/assets/css/styles.css`.

### Archivos Principales

#### `src/App.vue`

Este archivo contiene la estructura principal de la aplicación, incluyendo:

- Barra de navegación.
- Modales de inicio de sesión y registro.
- Secciones como servicios, reserva, preguntas frecuentes, testimonios, contacto y footer.

#### `src/components/ReserveBlock.vue`

Componente reutilizable para gestionar la sección de reservas.

#### `public/assets/js/bootstrap.min.js`

Archivo comprimido de Bootstrap 5, utilizado para estilos y componentes interactivos.

---

## Funcionalidades Clave

### Barra de Navegación

- **Responsiva**: Se adapta a dispositivos móviles y de escritorio.
- **Menú desplegable**: Incluye opciones adicionales como términos y condiciones, políticas de privacidad, etc.
- **Botón de inicio de sesión**: Abre un modal para iniciar sesión.

### Modales

- **Inicio de Sesión**: Permite a los usuarios iniciar sesión con su correo electrónico y contraseña.
- **Registro**: Permite a los usuarios registrarse proporcionando su nombre, correo y contraseña.

### Secciones

1. **Inicio**: Presenta el lema y la misión de la barbería.
2. **Servicios**: Muestra los servicios ofrecidos como cortes de cabello, arreglo de barba y tratamientos capilares.
3. **Reserva**: Incluye un componente reutilizable para gestionar reservas.
4. **Nosotros**: Explica la filosofía y experiencia de la barbería.
5. **Preguntas Frecuentes**: Responde a las dudas comunes de los clientes.
6. **Testimonios**: Muestra opiniones de clientes satisfechos.
7. **Contacto**: Proporciona un formulario para consultas y detalles de contacto.

### Footer

- Incluye enlaces a redes sociales y un botón para volver al inicio de la página.

---

## Estilos Personalizados

El archivo `App.vue` incluye estilos personalizados para:

- Botones (`btn-login`, `btn-solid-lg`, etc.).
- Modales (`login-modal`, `modal-container`, etc.).
- Barra de navegación (`navbar-collapse`, `navbar-toggler`, etc.).
- Footer (`footer`, `#myBtn`).

---

## Requisitos para conectar el frontend y el backend

> **IMPORTANTE:** Si usas autenticación basada en sesión/cookies, asegúrate de que:
>
> - Las cookies tengan `SameSite=None` y `Secure` en producción.
> - El frontend siempre envíe el token CSRF en las peticiones POST (ver método `getCookie` en Login.vue).
> - El backend acepte credenciales cruzadas (`credentials: include` en fetch/axios).

1. **Backend corriendo**

   - Ejecuta el backend con:
     ```bash
     uvicorn app.main:app --reload
     ```
   - El backend debe estar disponible en `http://localhost:8000`.

2. **Frontend corriendo**

   - Ejecuta el frontend con:
     ```bash
     npm run serve
     ```
   - El frontend estará en `http://localhost:8080`.

3. **CORS habilitado en el backend**

   - En `main.py` debe estar configurado:
     ```python
     app.add_middleware(
         CORSMiddleware,
         allow_origins=["*"],  # O ["http://localhost:8080"]
         allow_credentials=True,
         allow_methods=["*"],
         allow_headers=["*"],
     )
     ```

4. **Proxy configurado en el frontend**

   - En `vue.config.js` debe estar:
     ```javascript
     devServer: {
       proxy: {
         '^/clientes': {
           target: 'http://localhost:8000',
           changeOrigin: true,
         },
         '^/citas': {
           target: 'http://localhost:8000',
           changeOrigin: true,
         }
       }
     }
     ```

5. **Rutas de API correctas en el frontend**

   - Usa rutas relativas en axios/fetch, por ejemplo:
     ```javascript
     axios.post('/clientes/login', {...})
     axios.get('/citas', {...})
     ```
   - No incluyas el host ni `/api`.

6. **Ambos servidores deben estar activos**

   - Si uno no está corriendo, la conexión fallará.

7. **No tener errores de red ni de CORS**
   - Si ves "Network Error" o errores CORS, revisa los puntos anteriores.

---

# Solución al error "Network Error" entre frontend y backend

1. **Verifica que el backend esté corriendo**

   - Ejecuta:
     ```bash
     python -m uvicorn app.main:app --reload
     ```
   - Debes ver en la terminal:  
     `Uvicorn running on http://127.0.0.1:8000`  
     o  
     `Uvicorn running on http://localhost:8000`

2. **Verifica que el frontend esté corriendo**

   - Ejecuta:
     ```bash
     npm run serve
     ```
   - Accede a `http://localhost:8080` en tu navegador.

3. **Prueba el backend directamente**

   - Abre en tu navegador:  
     [http://localhost:8000/docs](http://localhost:8000/docs)
   - Si no carga, el backend no está funcionando.

4. **Verifica el proxy en `vue.config.js`**

   - Debe estar así:
     ```javascript
     devServer: {
       proxy: {
         '^/clientes': {
           target: 'http://localhost:8000',
           changeOrigin: true,
         },
         '^/citas': {
           target: 'http://localhost:8000',
           changeOrigin: true,
         }
       }
     }
     ```

5. **Verifica las rutas en el frontend**

   - Usa rutas relativas en axios:
     ```javascript
     axios.post('/clientes/register', {...})
     axios.post('/clientes/login', {...})
     axios.get('/citas', {...})
     ```
   - No incluyas `http://localhost:8000` en las rutas si usas el proxy.

6. **Verifica CORS en el backend**

   - En `main.py` debe estar:
     ```python
     app.add_middleware(
         CORSMiddleware,
         allow_origins=["*"],
         allow_credentials=True,
         allow_methods=["*"],
         allow_headers=["*"],
     )
     ```

7. **Reinicia ambos servidores después de cualquier cambio**

8. **Si el error persiste:**
   - Abre la consola del navegador y revisa el mensaje exacto.
   - Abre la terminal donde ejecutas el backend y revisa si hay errores.
   - Prueba el endpoint manualmente desde [http://localhost:8000/docs](http://localhost:8000/docs).

---

**Resumen:**

- Ambos servidores deben estar activos y sin errores.
- El proxy y CORS deben estar correctamente configurados.
- Usa rutas relativas en el frontend.
- Si el backend no responde en `/docs`, primero soluciona eso.

---

## Cómo Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Sube tus cambios al repositorio remoto:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
5. Abre un Pull Request en GitHub.

---

## Créditos

- **Diseño**: Inspirado en las mejores prácticas de diseño web moderno.
- **Desarrollador**: LeoniBres.
- **Framework**: Vue.js.
- **Estilos**: Bootstrap 5.

---

## Licencia

Este proyecto está bajo la licencia [MIT](https://opensource.org/licenses/MIT).
