const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    port: 8080,
    proxy: {
      "^/api": {
        // Cambia 'localhost' por la IP de tu backend si accedes desde otra máquina
        target: "http://192.168.1.40:8000",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/api" },
      },
    },
  },
});
