import { createRouter, createWebHistory } from 'vue-router';
import Main from '../layouts/Main.vue';
import Citas from '../pages/Citas.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/citas', component: Citas },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    if (to.path === '/contacto') {
      return {
        el: '#contacto-titulo',
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
});

export default router;
