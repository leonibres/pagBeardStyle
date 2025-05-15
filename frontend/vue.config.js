const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify")
      }
    }
  },
  devServer: {
    port: 8081,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        logLevel: 'debug',
        secure: false,
        onProxyReq(proxyReq) {
          console.log('Proxy Request:', proxyReq.path)
        },
        onError(err, req, res) {
          console.error('Proxy Error:', err)
        }
      }
    }
  }
})