const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    port: 8080,
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { '^/api': '/api' }
      }
    }
  }
})