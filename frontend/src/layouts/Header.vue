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
            <router-link class="nav-link" to="/" @click="scrollToTop">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/#services" @click="scrollToSection('services')">
              Servicios
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleCitasClick">Citas</a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/#details" @click="scrollToSection('details')">
              Nosotros
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/#contact" @click="scrollToSection('contact')">
              Contacto
            </router-link>
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
          <router-link to="/login" class="btn-hero-solid" style="padding: 0.5rem 1.2rem; font-size: 0.98rem;">
            <i class="fas fa-sign-in-alt me-2"></i>Acceder
          </router-link>
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
            <li><router-link class="dropdown-item" to="/perfil">Mi Perfil</router-link></li>
            <li><router-link class="dropdown-item" to="/mis-citas">Mis Citas</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click.prevent="handleLogout">Cerrar Sesión</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuth } from '@/composables/useAuth';

export default {
  name: 'NavBar',
  setup() {
    const { isAuthenticated, userData, logout } = useAuth();
    return { isAuthenticated, userData, logout };
  },
  data() {
    return {
      isNavbarOpen: false,
      isDropdownOpen: false,
      showAuthModal: false,
      authActiveTab: 'login'
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
    },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    },
    scrollToSection(sectionId) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    async handleCitasClick() {
      this.isNavbarOpen = false;
      
      if (this.isAuthenticated) {
        await this.$router.push('/citas');
      } else {
        sessionStorage.setItem('intendedPath', '/citas');
        await this.$router.push('/login');
      }
    },
    async handlePerfilClick() {
      if (this.isAuthenticated) {
        await this.$router.push('/perfil');
      } else {
        sessionStorage.setItem('intendedPath', '/perfil');
        await this.$router.push('/login');
      }
    },
    async handleMisCitasClick() {
      if (this.isAuthenticated) {
        await this.$router.push('/mis-citas');
      } else {
        sessionStorage.setItem('intendedPath', '/mis-citas');
        await this.$router.push('/login');
      }
    },
    async handleLogout() {
      await this.logout();
      this.$router.push('/');
    }
  }
};
</script>