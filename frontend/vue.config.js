const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  devServer: {
    port: 8080,
    proxy: {
      "^/api": {
        target: "http://192.168.1.40:8000", // IP del backend
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/api" },
      },
    },
  },
});
