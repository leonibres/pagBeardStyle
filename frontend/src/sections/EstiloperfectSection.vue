<template>
  <section class="estiloperfect-section">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="text-container estiloperfect-text">
            <h2 class="estiloperfect-title">¡Encuentra tu estilo perfecto con nosotros!</h2>
            <p class="p-large estiloperfect-desc">
              En <strong>Beard & Style</strong>, nos especializamos en realzar
              tu imagen con cortes modernos, arreglos de barba impecables y un
              servicio excepcional. ¡Déjanos cuidar de tu estilo!
            </p>
            <router-link class="btn-hero-solid estiloperfect-btn" to="/citas">
              <i class="fas fa-calendar-check me-2"></i>Reserva tu cita ahora
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EstiloperfectSection"
};
</script>

<style scoped>
.estiloperfect-section {
  background: var(--color-background);
  padding: 4rem 0;
  min-height: 320px;
  display: flex;
  align-items: center;
}

.estiloperfect-text {
  text-align: left;
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.estiloperfect-title {
  color: var(--color-primary);
  font-size: 2.2rem;
  font-family: var(--font-main);
  font-weight: var(--font-weight-bold);
  margin-bottom: 1.2rem;
  line-height: 1.2;
}

.estiloperfect-desc {
  color: var(--color-white);
  font-size: 1.15rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.estiloperfect-btn {
  margin-top: 0.5rem;
}

@media (max-width: 992px) {
  .estiloperfect-title {
    font-size: 1.5rem;
  }
  .estiloperfect-section {
    padding: 2rem 0;
  }
}

@media (max-width: 600px) {
  .estiloperfect-section {
    padding: 1rem 0;
  }
  .estiloperfect-text {
    padding: 1rem 0.3rem;
    text-align: center;
    align-items: center;
  }
}
</style>


