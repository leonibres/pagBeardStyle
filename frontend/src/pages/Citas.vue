<template>
  <div class="admin-container">
    <!-- Notificaciones -->
    <transition-group name="notification">
      <div v-for="notification in notifications" :key="notification.id" 
           :class="['notification', notification.type]">
        <i :class="['fas', notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle']"></i>
        {{ notification.message }}
      </div>
    </transition-group>

    <div class="admin-header">
      <h1><i class="fas fa-calendar-alt"></i> Gestión de Citas</h1>
      <div class="admin-actions">
        <button class="btn-refresh" @click="cargarCitas" title="Actualizar">
          <i class="fas fa-sync-alt"></i> Actualizar
        </button>
        <button class="btn-export" @click="exportarCitas" title="Exportar">
          <i class="fas fa-file-export"></i> Exportar
        </button>
      </div>
    </div>

    <!-- Contenido principal -->
    <div class="content">
      <!-- Formulario -->
      <div class="form-section" :class="{ 'editing': editando }">
        <h2><i :class="['fas', editando ? 'fa-edit' : 'fa-plus-circle']"></i> 
            {{ editando ? 'Editar Cita' : 'Nueva Cita' }}</h2>
        <form @submit.prevent="editando ? actualizarCita() : crearCita()">
          <div class="form-grid">
            <div class="form-group">
              <label>Nombre</label>
              <input v-model="form.nombre" type="text" required class="form-control-input">
            </div>
            <div class="form-group">
              <label>Email</label>
              <input v-model="form.email" type="email" required class="form-control-input">
            </div>
            <div class="form-group">
              <label>Teléfono</label>
              <input v-model="form.telefono" type="tel" placeholder="Opcional" class="form-control-input">
            </div>
            <div class="form-group">
              <label>Fecha</label>
              <input v-model="form.fecha" type="date" required class="form-control-input">
            </div>
            <div class="form-group">
              <label>Hora</label>
              <select v-model="form.hora" required>
                <option v-for="time in availableTimes" :value="time" :key="time">
                  {{ time }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Servicio</label>
              <select v-model="form.servicio" required>
                <option v-for="service in servicios" :value="service" :key="service">
                  {{ service }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Estado</label>
              <select v-model="form.estado" required>
                <option value="pendiente">Pendiente</option>
                <option value="confirmada">Confirmada</option>
                <option value="completada">Completada</option>
                <option value="cancelada">Cancelada</option>
              </select>
            </div>
          </div>
          <div class="form-actions">
            <button type="submit" class="btn-save">
              <i :class="['fas', editando ? 'fa-save' : 'fa-calendar-plus']"></i>
              {{ editando ? 'Guardar Cambios' : 'Agregar Cita' }}
            </button>
            <button v-if="editando" type="button" class="btn-cancel" @click="cancelarEdicion">
              <i class="fas fa-times"></i> Cancelar Edición
            </button>
          </div>
        </form>
      </div>

      <!-- Filtros -->
      <div class="filters">
        <div class="search-box">
          <i class="fas fa-search"></i>
          <input v-model="searchQuery" type="text" placeholder="Buscar por nombre, email o servicio..." @input="filtrarCitas">
        </div>
        <div class="filter-group">
          <select v-model="filterStatus" @change="filtrarCitas">
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendientes</option>
            <option value="confirmada">Confirmadas</option>
            <option value="completada">Completadas</option>
            <option value="cancelada">Canceladas</option>
          </select>
        </div>
      </div>

      <!-- Lista de citas -->
      <div class="table-section">
        <div class="table-header">
          <h3><i class="fas fa-list"></i> Listado de Citas <span class="badge">{{ filteredCitas.length }}</span></h3>
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">
              <i class="fas fa-chevron-left"></i> Anterior
            </button>
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">
              Siguiente <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div v-if="loading" class="loading">
          <i class="fas fa-spinner fa-spin"></i> Cargando citas...
        </div>

        <div v-else-if="filteredCitas.length === 0" class="empty">
          <i class="fas fa-calendar-times"></i>
          <p>No se encontraron citas</p>
        </div>

        <div v-else class="table-container">
          <table class="citas-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Fecha y Hora</th>
                <th>Servicio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cita in sortedCitas" :key="cita._id" :class="cita.estado">
                <td>
                  <strong>{{ cita.nombre }}</strong>
                  <small>{{ cita.email }}</small>
                  <small v-if="cita.telefono">{{ cita.telefono }}</small>
                </td>
                <td>
                  <div>{{ formatDate(cita.fecha) }}</div>
                  <small>{{ cita.hora }}</small>
                </td>
                <td>{{ cita.servicio }}</td>
                <td>
                  <span class="status-badge" :class="cita.estado">{{ cita.estado }}</span>
                </td>
                <td class="actions">
                  <button @click="editarCita(cita)" class="btn-edit" title="Editar">
                    <i class="fas fa-edit"></i> Editar
                  </button>
                  <button @click="cambiarEstado(cita)" class="btn-status" title="Cambiar estado">
                    <i class="fas fa-sync-alt"></i> Estado
                  </button>
                  <button @click="confirmarEliminar(cita._id)" class="btn-delete" title="Eliminar">
                    <i class="fas fa-trash-alt"></i> Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <transition name="modal">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3><i class="fas fa-exclamation-triangle"></i> {{ modalTitle }}</h3>
          <p>{{ modalMessage }}</p>
          <div class="modal-actions">
            <button @click="modalAction" class="btn-confirm">
              <i class="fas fa-check"></i> Confirmar
            </button>
            <button @click="closeModal" class="btn-cancel">
              <i class="fas fa-times"></i> Cancelar
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import axios from 'axios'
import { format, parseISO } from 'date-fns'

const API_URL = '/api/citas'
const loading = ref(true)
const citas = ref([])
const filteredCitas = ref([])
const editando = ref(false)
const editId = ref(null)
const notifications = ref([])
const showModal = ref(false)
const modalTitle = ref('')
const modalMessage = ref('')
const modalAction = ref(() => {})
const citaToDelete = ref(null)
const searchQuery = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 8

// Datos de configuración
const servicios = ref([
  'Corte de cabello',
  'Afeitado clásico',
  'Corte y barba',
  'Arreglo de barba',
  'Tinte para cabello',
  'Tratamiento capilar'
])

const availableTimes = ref([
  '09:00', '10:00', '11:00', '12:00', 
  '15:00', '16:00', '17:00', '18:00'
])

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  fecha: '',
  hora: availableTimes.value[0],
  servicio: servicios.value[0],
  comentario: '',
  estado: 'pendiente'
})

const sortedCitas = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredCitas.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredCitas.value.length / itemsPerPage))

// Métodos
function showNotification(message, type = 'success') {
  const id = Date.now()
  notifications.value.push({ id, message, type })
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }, 4000)
}

function formatDate(dateString) {
  return format(parseISO(dateString), 'dd/MM/yyyy')
}

function limpiarForm() {
  form.nombre = ''
  form.email = ''
  form.telefono = ''
  form.fecha = ''
  form.hora = availableTimes.value[0]
  form.servicio = servicios.value[0]
  form.comentario = ''
  form.estado = 'pendiente'
}

async function cargarCitas() {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(API_URL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    citas.value = res.data
    filtrarCitas()
    showNotification('Citas actualizadas correctamente')
  } catch (error) {
    console.error('Error al cargar citas:', error)
    showNotification('Error al cargar las citas', 'error')
    citas.value = []
    filteredCitas.value = []
  } finally {
    loading.value = false
  }
}

function filtrarCitas() {
  filteredCitas.value = citas.value.filter(cita => {
    const matchesSearch = searchQuery.value === '' || 
      cita.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cita.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      cita.servicio.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = filterStatus.value === '' || 
      cita.estado === filterStatus.value
    return matchesSearch && matchesStatus
  })
  currentPage.value = 1
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

async function crearCita() {
  try {
    const token = localStorage.getItem('token')
    await axios.post(API_URL, { ...form }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    limpiarForm()
    await cargarCitas()
    showNotification('Cita creada exitosamente')
  } catch (error) {
    console.error('Error al crear cita:', error)
    showNotification('Error al crear la cita', 'error')
  }
}

function editarCita(cita) {
  editando.value = true
  editId.value = cita._id
  Object.assign(form, {
    nombre: cita.nombre,
    email: cita.email,
    telefono: cita.telefono || '',
    fecha: cita.fecha,
    hora: cita.hora,
    servicio: cita.servicio,
    comentario: cita.comentario || '',
    estado: cita.estado || 'pendiente'
  })
}

async function actualizarCita() {
  try {
    const token = localStorage.getItem('token')
    await axios.put(`${API_URL}/${editId.value}`, { ...form }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    editando.value = false
    editId.value = null
    limpiarForm()
    await cargarCitas()
    showNotification('Cita actualizada correctamente')
  } catch (error) {
    console.error('Error al actualizar cita:', error)
    showNotification('Error al actualizar la cita', 'error')
  }
}

async function cambiarEstado(cita) {
  const estados = ['pendiente', 'confirmada', 'completada', 'cancelada']
  const currentIndex = estados.indexOf(cita.estado)
  const nextIndex = (currentIndex + 1) % estados.length
  const nuevoEstado = estados[nextIndex]
  try {
    const token = localStorage.getItem('token')
    await axios.patch(`${API_URL}/${cita._id}/estado`, { estado: nuevoEstado }, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    await cargarCitas()
    showNotification(`Estado cambiado a ${nuevoEstado}`)
  } catch (error) {
    console.error('Error al cambiar estado:', error)
    showNotification('Error al cambiar el estado', 'error')
  }
}

function confirmarEliminar(id) {
  citaToDelete.value = id
  openModal(
    'Confirmar eliminación',
    '¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer.',
    eliminarCitaConfirmed
  )
}

function eliminarCitaConfirmed() {
  eliminarCita(citaToDelete.value)
  closeModal()
}

async function eliminarCita(id) {
  try {
    const token = localStorage.getItem('token')
    await axios.delete(`${API_URL}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    await cargarCitas()
    showNotification('Cita eliminada correctamente')
  } catch (error) {
    console.error('Error al eliminar cita:', error)
    showNotification('Error al eliminar la cita', 'error')
  }
}

function cancelarEdicion() {
  editando.value = false
  editId.value = null
  limpiarForm()
}

function openModal(title, message, action) {
  modalTitle.value = title
  modalMessage.value = message
  modalAction.value = action
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}

async function exportarCitas() {
  try {
    const token = localStorage.getItem('token')
    const response = await axios.get(`${API_URL}/export`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      responseType: 'blob'
    })
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `citas-${format(new Date(), 'yyyy-MM-dd')}.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.remove()
    showNotification('Exportación completada correctamente')
  } catch (error) {
    console.error('Error al exportar citas:', error)
    showNotification('Error al exportar las citas', 'error')
  }
}

onMounted(() => {
  cargarCitas()
})
</script>
