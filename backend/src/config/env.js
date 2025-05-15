const path = require('path');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Exportar las variables de entorno
module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/beardstyle',
  PORT: process.env.PORT || 8000,
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:8080',
  JWT_SECRET: process.env.JWT_SECRET || 'beardstyle_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h'
}; 