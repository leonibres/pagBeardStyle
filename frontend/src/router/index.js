import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../layouts/Main.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/citas",
    name: "citas",
    component: () => import("../pages/Citas.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-appointment/:id",
    name: "editAppointment",
    component: () => import("../views/EditAppointment.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/appointments",
    name: "Appointments",
    component: () => import("../views/Appointments.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/my-appointments",
    name: "MyAppointments",
    component: () => import("../views/MyAppointments.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: "smooth",
          });
        }, 500);
      });
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach(async (to, from, next) => {
  console.log("Navegando a:", to.path);

  if (!to.meta.requiresAuth) {
    return next();
  }

  const token = localStorage.getItem("token");

  if (!token) {
    console.log("No hay token, redirigiendo al login");
    sessionStorage.setItem("intendedPath", to.fullPath);
    return next("/");
  }

  next();
});

export default router;
