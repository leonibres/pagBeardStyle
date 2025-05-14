import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js' // <-- Importa el router
// import store from './store' // <-- Descomenta si usas Vuex

import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap'

const app = createApp(App)
app.use(router) // <-- Usa el router
// app.use(store) // <-- Usa Vuex si lo necesitas
app.mount('#app')
