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
