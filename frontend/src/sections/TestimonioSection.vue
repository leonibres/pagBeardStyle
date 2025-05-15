<template>
  <section class="testimonio-section">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h2 class="section-title">Testimonios</h2>
          <p class="section-subtitle">
            Lo que nuestros clientes dicen de <strong>Beard & Style</strong>
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-4" v-for="(testimonio, idx) in testimonios" :key="idx">
          <div class="testimonio-card">
            <div class="testimonio-avatar">
              <img :src="testimonio.avatar" :alt="testimonio.nombre" />
            </div>
            <div class="testimonio-text">
              <p>"{{ testimonio.texto }}"</p>
            </div>
            <div class="testimonio-nombre">
              <strong>{{ testimonio.nombre }}</strong>
              <span class="testimonio-servicio">{{ testimonio.servicio }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TestimonioSection",
  data() {
    return {
      testimonios: [
        {
          nombre: "Carlos Ramírez",
          servicio: "Corte y barba",
          texto: "¡Excelente atención y resultados! Siempre salgo renovado y satisfecho.",
          avatar: "/assets/images/testimonio1.jpg"
        },
        {
          nombre: "Juan Pérez",
          servicio: "Tratamiento capilar",
          texto: "El mejor lugar para cuidar mi cabello. ¡Recomendado 100%!",
          avatar: "/assets/images/testimonio2.jpg"
        },
        {
          nombre: "Andrés Gómez",
          servicio: "Arreglo de barba",
          texto: "Profesionales y muy atentos. Mi barba nunca había lucido tan bien.",
          avatar: "/assets/images/testimonio3.jpg"
        }
      ]
    };
  }
};
</script>

