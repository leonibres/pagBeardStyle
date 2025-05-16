<template>
  <div class="admin-citas-panel">
    <!-- Header -->
    <header class="admin-header">
      <div class="header-content">
        <div class="header-title">
          <i class="fas fa-cut"></i>
          <h1>Tu cita, tu estilo, tu momento</h1>
        </div>
        <div class="user-info">
          <span>Bienvenido, <strong>Leoni</strong></span>
          <div class="user-avatar">L</div>
        </div>
      </div>
    </header>

    <!-- Panel principal -->
    <main class="admin-main">
      <section class="citas-section">
        <div class="section-header">
          <h2><i class="fas fa-calendar-alt"></i> Gestión de Citas</h2>
          <button class="btn-primary" @click="abrirFormularioNuevaCita">
            <i class="fas fa-plus"></i> Nueva Cita
          </button>
        </div>

        <!-- Listado de citas -->
        <div class="citas-container">
          <div v-if="citas.length === 0" class="empty-state">
            <i class="fas fa-calendar-times"></i>
            <h3>No hay citas registradas</h3>
            <button class="btn-primary" @click="abrirFormularioNuevaCita">
              <i class="fas fa-cut"></i> Crear primera cita
            </button>
          </div>

          <div v-else class="citas-grid">
            <div v-for="cita in citas" :key="cita._id" class="cita-card" :class="cita.estado">
              <div class="card-header">
                <h3>{{ cita.servicio }}</h3>
                <span class="status-badge">{{ formatEstado(cita.estado) }}</span>
              </div>
              
              <div class="card-body">
                <div class="info-item">
                  <i class="fas fa-calendar-day"></i>
                  <span>{{ formatFecha(cita.fecha) }}</span>
                </div>
                <div class="info-item">
                  <i class="fas fa-clock"></i>
                  <span>{{ cita.hora }}</span>
                </div>
                <div v-if="cita.comentario" class="info-item">
                  <i class="fas fa-comment"></i>
                  <span>{{ cita.comentario }}</span>
                </div>
              </div>
              
              <div class="card-actions">
                <button class="btn-icon edit" @click="abrirFormularioEditarCita(cita)" title="Editar">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon delete" @click="abrirModalEliminarCita(cita)" title="Eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Formulario de cita -->
    <div v-if="showForm" class="form-overlay" @click.self="cerrarFormulario">
      <div class="cita-form">
        <div class="form-header">
          <h3>{{ editando ? 'Editar Cita' : 'Nueva Cita' }}</h3>
          <button class="btn-close" @click="cerrarFormulario">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <form @submit.prevent="editando ? actualizarCita() : crearCita()">
          <div class="form-group">
            <label>Servicio</label>
            <select v-model="form.servicio" required>
              <option value="" disabled>Seleccione un servicio</option>
              <option v-for="serv in servicios" :key="serv" :value="serv">{{ serv }}</option>
            </select>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label>Fecha</label>
              <input type="date" v-model="form.fecha" :min="minFecha" required>
            </div>
            <div class="form-group">
              <label>Hora</label>
              <select v-model="form.hora" required>
                <option value="" disabled>Seleccione hora</option>
                <option v-for="hora in horasDisponibles" :key="hora" :value="hora">{{ hora }}</option>
              </select>
            </div>
          </div>
          
          <div class="form-group">
            <label>Comentarios</label>
            <textarea v-model="form.comentario" placeholder="Opcional"></textarea>
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
          
          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="cerrarFormulario">Cancelar</button>
            <button type="submit" class="btn-primary">
              {{ editando ? 'Guardar cambios' : 'Crear cita' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showModalEliminar" class="modal-overlay" @click.self="cerrarModalEliminar">
      <div class="confirm-modal">
        <div class="modal-header">
          <h3>Confirmar eliminación</h3>
        </div>
        <div class="modal-body">
          <p>¿Está seguro que desea eliminar esta cita?</p>
          <p class="text-muted">Esta acción no se puede deshacer.</p>
        </div>
        <div class="modal-footer">
          <button class="btn-secondary" @click="cerrarModalEliminar">Cancelar</button>
          <button class="btn-danger" @click="eliminarCitaConfirmada">Eliminar</button>
        </div>
      </div>
    </div>

    <!-- Notificación -->
    <transition name="fade">
      <div v-if="notificacion" class="notification">
        {{ notificacion }}
      </div>
    </transition>
  </div>
</template>

<script>
import { appointmentService } from '../services/api';

export default {
  name: 'Citas',
  data() {
    return {
      citas: [],
      servicios: [
        'Corte de Cabello',
        'Afeitado Clásico',
        'Corte y Barba',
        'Arreglo de Barba',
        'Tratamiento Capilar'
      ],
      horasDisponibles: [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30', '18:00'
      ],
      form: {
        servicio: '',
        fecha: '',
        hora: '',
        comentario: '',
        estado: 'pendiente'
      },
      editando: false,
      editId: null,
      showForm: false,
      showModalEliminar: false,
      citaAEliminar: null,
      notificacion: ''
    };
  },
  computed: {
    minFecha() {
      return new Date().toISOString().split('T')[0];
    }
  },
  methods: {
    async cargarCitas() {
      try {
        const response = await appointmentService.getMine();
        this.citas = response.data;
      } catch (error) {
        console.error('Error al cargar citas:', error);
        this.mostrarNotificacion('Error al cargar las citas');
      }
    },
    formatFecha(fecha) {
      if (!fecha) return '';
      const d = new Date(fecha);
      return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
    },
    formatEstado(estado) {
      const estados = {
        'pendiente': 'Pendiente',
        'confirmada': 'Confirmada',
        'completada': 'Completada',
        'cancelada': 'Cancelada'
      };
      return estados[estado] || estado;
    },
    mostrarNotificacion(mensaje) {
      this.notificacion = mensaje;
      setTimeout(() => this.notificacion = '', 3000);
    },
    abrirFormularioNuevaCita() {
      this.editando = false;
      this.form = { servicio: '', fecha: '', hora: '', comentario: '', estado: 'pendiente' };
      this.showForm = true;
    },
    abrirFormularioEditarCita(cita) {
      this.editando = true;
      this.editId = cita._id;
      this.form = {
        servicio: cita.servicio,
        fecha: cita.fecha ? cita.fecha.slice(0, 10) : '',
        hora: cita.hora,
        comentario: cita.comentario || '',
        estado: cita.estado || 'pendiente'
      };
      this.showForm = true;
    },
    cerrarFormulario() {
      this.showForm = false;
    },
    async crearCita() {
      try {
        const citaData = {
          servicio: this.form.servicio,
          date: `${this.form.fecha}T${this.form.hora}`,
          comentario: this.form.comentario || "",
          status: this.form.estado
        };
        await appointmentService.create(citaData);
        this.mostrarNotificacion('Cita creada correctamente');
        await this.cargarCitas();
        this.cerrarFormulario();
      } catch (error) {
        console.error('❌ Error:', error);
        this.mostrarNotificacion('Error al crear la cita');
      }
    },
    async actualizarCita() {
      try {
        const citaData = {
          servicio: this.form.servicio,
          date: `${this.form.fecha}T${this.form.hora}`,
          comentario: this.form.comentario || "",
          status: this.form.estado
        };
        await appointmentService.update(this.editId, citaData);
        this.mostrarNotificacion('Cita actualizada correctamente');
        this.cerrarFormulario();
        this.cargarCitas();
      } catch (e) {
        this.mostrarNotificacion('Error al actualizar cita');
      }
    },
    abrirModalEliminarCita(cita) {
      this.citaAEliminar = cita;
      this.showModalEliminar = true;
    },
    cerrarModalEliminar() {
      this.showModalEliminar = false;
    },
    async eliminarCitaConfirmada() {
      try {
        await appointmentService.delete(this.citaAEliminar.id || this.citaAEliminar._id);
        this.mostrarNotificacion('Cita eliminada correctamente');
        this.cerrarModalEliminar();
        this.cargarCitas();
      } catch (e) {
        this.mostrarNotificacion('Error al eliminar cita');
      }
    }
  },
  mounted() {
    this.cargarCitas();
  }
};
</script>

<style scoped>
/* Estructura principal */
.admin-citas-panel {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.admin-header {
  background-color: var(--color-white);
  padding: 1rem 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-top: 3.5rem; /* aumenta el margen superior para dejar espacio al navbar fijo */
  z-index: 1;
  position: relative;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-title i {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.header-title h1 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--color-dark);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--color-light-gray);
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-bold);
}

.admin-main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

/* Sección de citas */
.citas-section {
  background-color: var(--color-white);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.section-header h2 {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-dark);
}

.section-header i {
  color: var(--color-primary);
}

.section-header button.btn-primary i {
  color: #1f1f1f; /* --color-gray */
  transition: color 0.2s;
}

.section-header button.btn-primary:hover i {
  color: #fff;
}

/* Contenedor de citas */
.citas-container {
  padding: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--color-light-gray);
  /* Centrar el contenido vertical y horizontalmente */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
}

.empty-state h3 {
  margin-bottom: 1rem;
  color: var(--color-dark);
}

.empty-state button.btn-primary {
  padding: 0.45rem 1.1rem;
  font-size: 1rem;
  min-width: unset;
  border-radius: 5px;
  box-shadow: none;
  margin-top: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center; /* centra el contenido horizontalmente */
  gap: 0.5rem;
  background: #F68F32;
  color: #fff;
  border: 2px solid #F68F32;
  transition: background 0.2s, color 0.2s, border 0.2s;
  margin-left: auto;
  margin-right: auto;
}

.empty-state button.btn-primary i {
  font-size: 1.2rem;
  margin: 0; /* elimina cualquier margen lateral */
  color: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: center; /* centra el icono vertical y horizontalmente */
  min-width: 1.2em;
  min-height: 1.2em;
}

.empty-state button.btn-primary:hover {
  background: #fff;
  color: #F68F32;
  border-color: #F68F32;
}

.empty-state button.btn-primary:hover i {
  color: #F68F32;
}

.citas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* Tarjeta de cita */
.cita-card {
  background-color: var(--color-white);
  border-radius: 10px;
  padding: 1.5rem;
  border-left: 4px solid;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.cita-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.cita-card.pendiente {
  border-left-color: #FFC107;
}

.cita-card.confirmada {
  border-left-color: #4CAF50;
}

.cita-card.completada {
  border-left-color: #2196F3;
}

.cita-card.cancelada {
  border-left-color: #F44336;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--color-dark);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  text-transform: capitalize;
}

.cita-card.pendiente .status-badge {
  background-color: rgba(255, 193, 7, 0.1);
  color: #FFC107;
}

.cita-card.confirmada .status-badge {
  background-color: rgba(76, 175, 80, 0.1);
  color: #4CAF50;
}

.cita-card.completada .status-badge {
  background-color: rgba(33, 150, 243, 0.1);
  color: #2196F3;
}

.cita-card.cancelada .status-badge {
  background-color: rgba(244, 67, 54, 0.1);
  color: #F44336;
}

.card-body {
  margin-bottom: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: var(--color-light-gray);
  font-size: 0.9rem;
}

.info-item i {
  width: 20px;
  text-align: center;
  color: var(--color-primary);
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* Botones */
.btn-primary {
  background-color: var(--color-primary);
  color: var(--color-btn-text);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary:hover {
  background-color: #e07d22;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(246, 143, 50, 0.3);
}

.btn-secondary {
  background-color: var(--color-white);
  color: var(--color-dark);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background-color: #f0f0f0;
  border-color: rgba(0, 0, 0, 0.2);
}

.btn-danger {
  background-color: #F44336;
  color: var(--color-white);
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-danger:hover {
  background-color: #d32f2f;
  box-shadow: 0 4px 12px rgba(244, 67, 54, 0.3);
}

.btn-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-icon.edit {
  color: #2196F3;
}

.btn-icon.edit:hover {
  background-color: rgba(33, 150, 243, 0.1);
}

.btn-icon.delete {
  color: #F44336;
}

.btn-icon.delete:hover {
  background-color: rgba(244, 67, 54, 0.1);
}

.btn-close {
  background: none;
  border: none;
  color: var(--color-light-gray);
  cursor: pointer;
  font-size: 1.25rem;
  transition: all 0.3s ease;
}

.btn-close:hover {
  color: var(--color-dark);
  transform: rotate(90deg);
}

/* Formulario */
.form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.cita-form {
  background-color: var(--color-white);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  animation: fadeIn 0.3s ease-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.form-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-dark);
}

form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-dark);
  font-weight: var(--font-weight-medium);
}

select, input, textarea {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--color-white);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  color: var(--color-dark);
  font-size: 1rem;
  transition: all 0.3s ease;
}

select:focus, input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(246, 143, 50, 0.2);
}

textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Modal de confirmación */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.confirm-modal {
  background-color: var(--color-white);
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  overflow: hidden;
  animation: fadeIn 0.3s ease-out;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--color-dark);
}

.modal-body {
  padding: 1.5rem;
}

.modal-body p {
  margin-bottom: 0.5rem;
  color: var(--color-dark);
}

.text-muted {
  color: var(--color-light-gray);
  font-size: 0.875rem;
}

.modal-footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Notificación */
.notification {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1050;
  max-width: 300px;
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .citas-grid {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .form-actions, .modal-footer {
    flex-direction: column;
  }
  
  .btn-primary, .btn-secondary, .btn-danger {
    width: 100%;
  }
}
</style>