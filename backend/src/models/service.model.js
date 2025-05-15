const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'El nombre del servicio es requerido'],
    trim: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'La descripción del servicio es requerida'],
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'La duración del servicio es requerida'],
    min: [15, 'La duración mínima es de 15 minutos']
  },
  price: {
    type: Number,
    required: [true, 'El precio del servicio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  image: {
    type: String,
    default: null
  },
  category: {
    type: String,
    required: [true, 'La categoría del servicio es requerida'],
    enum: ['corte', 'barba', 'tratamiento', 'combo']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Índice para búsquedas por categoría
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service; 