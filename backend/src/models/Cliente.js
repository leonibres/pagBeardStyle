const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido']
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6,
    select: false
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido']
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'users'
});

// Encriptar contraseña antes de guardar
clienteSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para verificar contraseña
clienteSchema.methods.verificarPassword = async function(passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

const Cliente = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente; 