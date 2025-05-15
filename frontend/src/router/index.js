import { createRouter, createWebHistory } from 'vue-router';
import Main from '../layouts/Main.vue';
import Citas from '../pages/Citas.vue';

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: Main,
    meta: { requiresAuth: false }
  },
  {
    path: '/citas',
    name: 'citas',
    component: Citas,
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
});

router.beforeEach(async (to, from, next) => {
  console.log('🚦 Navegando a:', to.path);
  
  // Si la ruta no requiere autenticación, permitir acceso
  if (!to.meta.requiresAuth) {
    console.log('📢 Ruta pública, permitiendo acceso');
    return next();
  }

  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('userData');

  if (!token || !userData) {
    console.log('❌ No hay token o userData');
    sessionStorage.setItem('intendedPath', to.fullPath);
    return next('/');
  }

  next();
});

export default router;
