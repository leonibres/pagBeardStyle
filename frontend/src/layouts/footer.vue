<template>
  <section class="footer bg-contrast">
    <button id="myBtn" @click="scrollToTop">
      <i class="fas fa-arrow-up"></i>
    </button>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h4>
            ¡Síguenos en nuestras redes sociales para más consejos de estilo y
            promociones exclusivas!
          </h4>
          <div class="social-container">
            <span class="fa-stack">
              <a href="#your-link">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-facebook-f fa-stack-1x"></i>
              </a>
            </span>
            <span class="fa-stack">
              <a href="#your-link">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-twitter fa-stack-1x"></i>
              </a>
            </span>
            <span class="fa-stack">
              <a href="#your-link">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-pinterest-p fa-stack-1x"></i>
              </a>
            </span>
            <span class="fa-stack">
              <a href="#your-link">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-instagram fa-stack-1x"></i>
              </a>
            </span>
            <span class="fa-stack">
              <a href="#your-link">
                <i class="fas fa-circle fa-stack-2x"></i>
                <i class="fab fa-youtube fa-stack-1x"></i>
              </a>
            </span>
          </div>
          <p class="p-small statement">
            Copyright © <a href="#">Beard & Style</a>. Todos los derechos
            reservados.
          </p>
          <p class="p-small statement">
            Diseñado por
            <a href="https://masukmia.com" target="_blank">LeoniBres</a>.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FooterSection",
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
};
</script>


