const mongoose = require('mongoose');
const moment = require('moment');

const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El cliente es requerido']
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: [true, 'El servicio es requerido']
  },
  date: {
    type: Date,
    required: [true, 'La fecha es requerida'],
    validate: {
      validator: function(value) {
        // Validar que la fecha no sea en el pasado
        return value > new Date();
      },
      message: 'La fecha de la cita no puede ser en el pasado'
    }
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmada', 'completada', 'cancelada'],
    default: 'pendiente'
  },
  notes: {
    type: String,
    trim: true
  },
  duration: {
    type: Number,
    required: [true, 'La duración es requerida'],
    min: [15, 'La duración mínima es de 15 minutos']
  },
  price: {
    type: Number,
    required: [true, 'El precio es requerido'],
    min: [0, 'El precio no puede ser negativo']
  },
  reminderSent: {
    type: Boolean,
    default: false
  },
  confirmationToken: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// Índices para mejorar las búsquedas
appointmentSchema.index({ date: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ client: 1 });

// Método virtual para verificar si la cita está próxima (24 horas)
appointmentSchema.virtual('isUpcoming').get(function() {
  const now = new Date();
  const appointmentDate = new Date(this.date);
  const diff = appointmentDate - now;
  return diff > 0 && diff <= 24 * 60 * 60 * 1000;
});

// Método para verificar disponibilidad de horario
appointmentSchema.statics.checkAvailability = async function(date, duration, excludeId = null) {
  const startTime = moment(date);
  const endTime = moment(date).add(duration, 'minutes');
  
  const query = {
    date: {
      $lt: endTime.toDate(),
      $gt: startTime.subtract(duration, 'minutes').toDate()
    },
    status: { $nin: ['cancelada', 'completada'] }
  };
  
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  
  const conflictingAppointments = await this.find(query);
  return conflictingAppointments.length === 0;
};

// Middleware pre-save para validar disponibilidad
appointmentSchema.pre('save', async function(next) {
  if (this.isModified('date') || this.isModified('duration')) {
    const isAvailable = await this.constructor.checkAvailability(
      this.date,
      this.duration,
      this._id
    );
    
    if (!isAvailable) {
      next(new Error('El horario seleccionado no está disponible'));
    }
  }
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment; 