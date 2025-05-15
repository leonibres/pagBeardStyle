<template>
  <nav class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <span class="fw-bold">Beard & Style</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent"
        aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarContent" :class="{ show: isNavbarOpen }">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ path: '/', hash: '#services' }">Servicios</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleCitasClick">Citas</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ path: '/', hash: '#details' }">Nosotros</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ path: '/', hash: '#contact' }">Contacto</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown"
              aria-expanded="false" @click="toggleDropdown">
              Más
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown" :class="{ show: isDropdownOpen }">
              <li><router-link class="dropdown-item" to="/articulos">Artículos</router-link></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li><router-link class="dropdown-item" to="/terminos">Términos</router-link></li>
              <li><router-link class="dropdown-item" to="/privacidad">Privacidad</router-link></li>
            </ul>
          </li>
        </ul>

        <!-- Botón de acceso o menú de usuario -->
        <div v-if="!isAuthenticated">
          <button
            class="btn-hero-solid"
            style="padding: 0.5rem 1.2rem; font-size: 0.98rem; min-width: unset;"
            @click="openLoginModal"
          >
            <i class="fas fa-sign-in-alt me-2"></i>Acceder
          </button>
        </div>
        <div v-else class="dropdown">
          <button 
            class="btn-hero-solid dropdown-toggle"
            style="padding: 0.5rem 1.2rem; font-size: 0.98rem;"
            type="button"
            id="userMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-user me-2"></i>{{ userData.nombre }}
          </button>
          <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userMenuButton">
            <li><a class="dropdown-item" href="/perfil">Mi Perfil</a></li>
            <li><a class="dropdown-item" href="/mis-citas">Mis Citas</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>

  <!-- Modal de Login/Registro -->
  <div
    class="auth-modal"
    :class="{ 'auth-modal-show': showAuthModal }"
    @click.self="closeAuthModal"
  >
    <div class="auth-modal-container">
      <button class="auth-modal-close" @click="closeAuthModal">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      
      <div class="auth-modal-tabs">
        <button class="auth-modal-tab" :class="{ 'auth-modal-tab-active': authActiveTab === 'login' }" @click="authActiveTab = 'login'">
          Iniciar Sesión
        </button>
        <button class="auth-modal-tab" :class="{ 'auth-modal-tab-active': authActiveTab === 'register' }" @click="authActiveTab = 'register'">
          Registrarse
        </button>
      </div>
      
      <div class="auth-modal-content">
        <form v-if="authActiveTab === 'login'" @submit.prevent="handleAuthLogin" class="auth-modal-form">
          <div class="auth-form-group">
            <label for="auth-login-email">Correo Electrónico</label>
            <input id="auth-login-email" type="email" v-model="authLogin.email" required placeholder="tu@email.com">
          </div>
          <div class="auth-form-group">
            <label for="auth-login-password">Contraseña</label>
            <input id="auth-login-password" type="password" v-model="authLogin.password" required placeholder="••••••••">
          </div>
          <div class="auth-form-options">
            <label class="auth-remember-me">
              <input type="checkbox" v-model="authLogin.remember"> Recordarme
            </label>
            <a href="#" class="auth-forgot-password">¿Olvidaste tu contraseña?</a>
          </div>
          <button type="submit" class="auth-btn-submit">Iniciar Sesión</button>
          <div class="auth-modal-divider">
            <span>o continuar con</span>
          </div>
          <div class="auth-social-buttons">
            <button type="button" class="auth-btn-social auth-btn-google">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
              Google
            </button>
            <button type="button" class="auth-btn-social auth-btn-facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
              Facebook
            </button>
          </div>
        </form>
        
        <form v-if="authActiveTab === 'register'" @submit.prevent="handleAuthRegister" class="auth-modal-form">
          <div class="auth-form-group">
            <label for="auth-register-nombre">Nombre</label>
            <input id="auth-register-nombre" type="text" v-model="authRegister.nombre" required placeholder="Juan">
          </div>
          <div class="auth-form-group">
            <label for="auth-register-apellido">Apellido</label>
            <input id="auth-register-apellido" type="text" v-model="authRegister.apellido" required placeholder="Pérez">
          </div>
          <div class="auth-form-group">
            <label for="auth-register-email">Correo Electrónico</label>
            <input id="auth-register-email" type="email" v-model="authRegister.email" required placeholder="tu@email.com">
          </div>
          <div class="auth-form-group">
            <label for="auth-register-phone">Teléfono</label>
            <input id="auth-register-phone" type="tel" v-model="authRegister.telefono" required placeholder="Ej: 3001234567">
          </div>
          <div class="auth-form-group">
            <label for="auth-register-password">Contraseña</label>
            <input id="auth-register-password" type="password" v-model="authRegister.password" required placeholder="••••••••">
          </div>
          <div class="auth-form-group">
            <label for="auth-register-confirm">Confirmar Contraseña</label>
            <input id="auth-register-confirm" type="password" v-model="authRegister.confirmPassword" required placeholder="••••••••">
          </div>
          <div class="auth-form-terms">
            <label>
              <input type="checkbox" v-model="authRegister.terms" required>
              Acepto los <a href="/terminos">Términos y Condiciones</a> y la <a href="/privacidad">Política de Privacidad</a>
            </label>
          </div>
          <button type="submit" class="auth-btn-submit">Registrarse</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../axiosConfig';

export default {
  name: 'NavBar',
  data() {
    return {
      isNavbarOpen: false,
      isDropdownOpen: false,
      showAuthModal: false,
      authActiveTab: 'login',
      isLoading: false,
      isAuthenticated: false,
      userData: null,
      authLogin: {
        email: '',
        password: '',
        remember: false
      },
      authRegister: {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        terms: false
      },
      showLoginMessage: false,
      showRestrictedModal: false
    };
  },
  created() {
    this.checkAuthStatus();
    window.addEventListener('auth-check', this.checkAuthStatus);
    window.addEventListener('show-restricted', () => {
      if (!this.isAuthenticated) {
        this.showRestrictedModal = true;
      }
    });
  },
  mounted() {
    window.addEventListener('open-login-modal', this.openLoginModal);
    
    // Manejar scroll a secciones cuando se carga una URL con hash
    if (this.$route.hash) {
      this.scrollToSection(this.$route.hash);
    }
  },
  beforeUnmount() {
    window.removeEventListener('open-login-modal', this.openLoginModal);
    window.removeEventListener('auth-check', this.checkAuthStatus);
    window.removeEventListener('show-restricted', () => {
      this.showRestrictedModal = true;
    });
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    openLoginModal() {
      if (!this.isAuthenticated) {
        this.showRestrictedModal = false;
        this.showAuthModal = true;
        this.showLoginMessage = true;
        this.authActiveTab = 'login';
        document.body.style.overflow = 'hidden';
      }
    },
    closeAuthModal() {
      if (!this.showAuthModal) return;
      this.showAuthModal = false;
      this.showLoginMessage = false;
      document.body.style.overflow = '';
    },
    checkAuthStatus() {
      console.log('🔍 Verificando estado de autenticación en Header');
      const token = localStorage.getItem('token');
      const userDataStr = localStorage.getItem('userData');
      
      console.log('Token encontrado:', !!token);
      console.log('UserData encontrado:', !!userDataStr);

      try {
        const userData = JSON.parse(userDataStr);
        this.isAuthenticated = true;
        this.userData = userData;
        console.log('✅ Usuario autenticado:', {
          nombre: userData.nombre,
          email: userData.email
        });
        return true;
      } catch (error) {
        console.error('❌ Error al parsear userData:', error);
        this.handleLogout();
        return false;
      }
    },
    scrollToSection(hash) {
      // Cerrar el navbar si está abierto
      this.isNavbarOpen = false;
      
      // Esperar un momento para asegurar que el DOM esté listo
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    },
    async handleAuthLogin() {
      try {
        this.isLoading = true;
        console.log('🔑 Iniciando proceso de login...');

        const response = await axiosInstance.post("/api/clientes/login", {
          email: this.authLogin.email,
          password: this.authLogin.password
        });

        console.log('📨 Respuesta del servidor:', {
          status: response.status,
          tieneToken: !!response.data.token,
          tieneData: !!response.data.data
        });

        // Verificar y guardar el token
        const token = response.data.token;
        const clienteData = response.data.data?.cliente || response.data.cliente || response.data;

        if (!token) {
          throw new Error('No se recibió el token del servidor');
        }

        // Limpiar cualquier dato de autenticación anterior
        localStorage.removeItem('token');
        localStorage.removeItem('userData');

        console.log('💾 Guardando datos en localStorage...');
        // Guardar datos en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userData", JSON.stringify(clienteData));
        
        // Actualizar estado
        this.isAuthenticated = true;
        this.userData = clienteData;

        console.log('✅ Login exitoso:', {
          isAuthenticated: this.isAuthenticated,
          userData: this.userData
        });

        // Cerrar modales
        this.showRestrictedModal = false;
        this.showAuthModal = false;
        this.showLoginMessage = false;
        document.body.style.overflow = '';

        // Manejar redirección
        const intendedPath = sessionStorage.getItem('intendedPath');
        console.log('🔄 Ruta pendiente:', intendedPath);
        
        if (intendedPath) {
          console.log('➡️ Intentando redirección a:', intendedPath);
          sessionStorage.removeItem('intendedPath');
          
          // Usar window.location.href para forzar la navegación
          window.location.href = intendedPath;
        } else {
          // Si no hay ruta pendiente, ir a citas por defecto
          window.location.href = '/citas';
        }

      } catch (error) {
        console.error('❌ Error en login:', error.response || error);
        let errorMessage = "Error al iniciar sesión";

        if (error.response?.data) {
          errorMessage = error.response.data.detail || error.response.data.message || error.response.data;
        }

        // Limpiar datos de autenticación en caso de error
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        this.isAuthenticated = false;
        this.userData = null;

        alert(errorMessage);
      } finally {
        this.isLoading = false;
      }
    },
    async handleAuthRegister() {
      if (this.authRegister.password !== this.authRegister.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      if (!this.authRegister.terms) {
        alert('Debes aceptar los términos y condiciones');
        return;
      }

      const registroData = {
        nombre: this.authRegister.nombre,
        apellido: this.authRegister.apellido,
        email: this.authRegister.email,
        telefono: this.authRegister.telefono,
        password: this.authRegister.password
      };

      try {
        this.isLoading = true;
        const response = await axiosInstance.post("/api/clientes/register", registroData);
        this.handleRegisterSuccess(response);
      } catch (error) {
        this.handleAuthError(error, "register");
      } finally {
        this.isLoading = false;
      }
    },
    handleRegisterSuccess(response) {
      console.log('Registro exitoso:', response.data);
      alert("¡Registro completado! Por favor inicia sesión.");
      
      this.authRegister = {
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        terms: false
      };
      
      this.authActiveTab = "login";
    },
    handleAuthError(error, action) {
      console.error(`Error en ${action}:`, error);
      
      let errorMessage = {
        login: "Error al iniciar sesión",
        register: "Error al registrar usuario"
      }[action];

      if (error.response) {
        if (error.response.data && error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data && typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else {
          const statusHandlers = {
            400: () => "Datos inválidos",
            401: () => "Credenciales incorrectas",
            409: () => "El correo electrónico ya está registrado",
            500: () => "Error interno del servidor"
          };
          errorMessage = statusHandlers[error.response.status]?.() || errorMessage;
        }
      } else if (error.request) {
        errorMessage = "No se pudo conectar con el servidor";
      }

      alert(errorMessage);
    },
    handleLogout() {
      console.log('Cerrando sesión...');
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      sessionStorage.removeItem('intendedPath');
      
      this.isAuthenticated = false;
      this.userData = null;
      
      console.log('Sesión cerrada');
      this.$router.push("/");
    },
    async handleCitasClick() {
      console.log('🎯 Click en Citas');
      this.isNavbarOpen = false;
      
      try {
        if (this.isAuthenticated) {
          console.log('✅ Usuario autenticado, navegando a /citas');
          // Forzar la navegación usando location.href
          window.location.href = '/citas';
        } else {
          console.log('❌ Usuario no autenticado, mostrando modal de login');
          sessionStorage.setItem('intendedPath', '/citas');
          this.showAuthModal = true;
          this.authActiveTab = 'login';
          document.body.style.overflow = 'hidden';
        }
      } catch (error) {
        console.error('Error al navegar:', error);
        // Intentar navegación alternativa
        window.location.href = '/citas';
      }
    }
  },
  watch: {
    '$route'(to) {
      // Manejar scroll cuando cambia el hash en la ruta
      if (to.hash) {
        this.scrollToSection(to.hash);
      }
    }
  }
};
</script>