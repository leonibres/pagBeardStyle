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
            <router-link class="nav-link" to="/citas">Citas</router-link>
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

        <button
          class="btn-hero-solid"
          @click="openLoginModal"
        >
          <i class="fas fa-sign-in-alt me-2"></i>Acceder
        </button>
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
            <label for="auth-register-name">Nombre Completo</label>
            <input id="auth-register-name" type="text" v-model="authRegister.name" required placeholder="Juan Pérez">
          </div>
          <div class="auth-form-group">
            <label for="auth-register-email">Correo Electrónico</label>
            <input id="auth-register-email" type="email" v-model="authRegister.email" required placeholder="tu@email.com">
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
export default {
  name: 'NavBar',
  data() {
    return {
      isNavbarOpen: false,
      isDropdownOpen: false,
      showAuthModal: false,
      authActiveTab: 'login',
      authLogin: {
        email: '',
        password: '',
        remember: false
      },
      authRegister: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
      }
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    openLoginModal() {
      this.showAuthModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeAuthModal() {
      if (!this.showAuthModal) return;
      this.showAuthModal = false;
      document.body.style.overflow = '';
    },
    handleAuthLogin() {
      // Lógica para iniciar sesión
      console.log('Login data:', this.authLogin);
      // Aquí iría la llamada a tu API
      this.closeAuthModal();
    },
    handleAuthRegister() {
      // Lógica para registrar
      if (this.authRegister.password !== this.authRegister.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      console.log('Register data:', this.authRegister);
      // Aquí iría la llamada a tu API
      this.closeAuthModal();
    }
  }
};
</script>

