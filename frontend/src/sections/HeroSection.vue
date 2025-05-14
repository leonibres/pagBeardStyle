<template>
  <header id="header" class="header">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-xl-5">
          <div class="text-container">
            <h1 class="h1-large hero-title">
              <span class="brand-name brand-beard">BEARD</span>
              <span class="brand-name">&nbsp;&amp; STYLE</span>
            </h1>
            <p class="p-large">
              En Beard & Style, nos dedicamos a brindarte el cuidado y estilo
              excepcionales que mereces, adaptados a tus preferencias únicas.
              ¡Es tu momento, vamos a brillar juntos!
            </p>
            <div class="button-group">
              <router-link class="btn-hero-solid" to="/citas">
                <i class="fas fa-calendar-alt me-2"></i>Reservar cita
              </router-link>
              <a class="btn-hero-outline" href="#services">
                <i class="fas fa-cut me-2"></i>Nuestros servicios
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-xl-7">
          <div class="image-container">
            <img class="img-fluid" src="assets/images/header-image.png" alt="Barbero profesional trabajando" />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderSection"
};
</script>