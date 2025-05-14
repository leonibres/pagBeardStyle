<template>
  <section class="edit-appointment">
    <div class="container">
      <h2>Editar Cita</h2>
      <form @submit.prevent="updateAppointment">
        <div class="form-group">
          <label for="nombre">Nombre</label>
          <input id="nombre" v-model="appointment.nombre" type="text" required />
        </div>
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input id="fecha" v-model="appointment.fecha" type="datetime-local" required />
        </div>
        <div class="form-group">
          <label for="servicio">Servicio</label>
          <select id="servicio" v-model="appointment.servicio" required>
            <option value="Corte de cabello">Corte de cabello</option>
            <option value="Arreglo de barba">Arreglo de barba</option>
            <option value="Combo Corte + Barba">Combo Corte + Barba</option>
          </select>
        </div>
        <div class="form-group">
          <label for="barbero">Barbero</label>
          <input id="barbero" v-model="appointment.barbero" type="text" />
        </div>
        <button type="submit" class="btn btn-primary">Guardar Cambios</button>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "EditAppointment",
  props: ["id"],
  data() {
    return {
      appointment: {
        nombre: "",
        fecha: "",
        servicio: "",
        barbero: "",
      },
    };
  },
  async created() {
    const token = localStorage.getItem("authToken");
    const response = await axios.get(`http://localhost:5000/api/reservas/${this.id}`, {
      headers: {
        Authorization: token,
      },
    });
    this.appointment = response.data;
  },
  methods: {
    async updateAppointment() {
      const token = localStorage.getItem("authToken");
      await axios.put(`http://localhost:5000/api/reservas/${this.id}`, this.appointment, {
        headers: {
          Authorization: token,
        },
      });
      alert("Cita actualizada con éxito");
      this.$router.push("/mis-citas");
    },
  },
};
</script>

<style scoped>
.edit-appointment {
  padding: 2rem;
}
</style>
