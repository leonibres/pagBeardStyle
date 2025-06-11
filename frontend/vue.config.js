const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://192.168.1.40:8000", // Dirección del backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
