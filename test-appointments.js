const mongoose = require('mongoose');
const path = require('path');

// Cargar modelos
const modelsPath = path.join(__dirname, 'src', 'models');
const Appointment = require(path.join(modelsPath, 'appointment.model'));
const User = require(path.join(modelsPath, 'user.model'));
const Service = require(path.join(modelsPath, 'service.model'));

// Establecer modo de prueba
process.env.NODE_ENV = 'test';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/barbershop';

const testAppointments = async () => {
  try {
    // Conectar a MongoDB
    console.log('Intentando conectar a MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');

    // Verificar la conexión
    const dbState = mongoose.connection.readyState;
    if (dbState !== 1) {
      throw new Error('No se pudo conectar a MongoDB. Estado: ' + dbState);
    }

    // 0. Limpiar las colecciones
    console.log('Limpiando base de datos...');
    await Promise.all([
      User.deleteMany({}),
      Service.deleteMany({}),
      Appointment.deleteMany({})
    ]);

    // 1. Crear usuario de prueba
    console.log('Creando usuario de prueba...');
    const testUser = await User.create({
      name: 'Cliente Prueba',
      email: 'prueba@example.com',
      password: '123456',
      phone: '123456789'
    });
    console.log('Usuario creado:', {
      _id: testUser._id,
      nombre: testUser.name,
      email: testUser.email
    });

    // 2. Crear servicios
    console.log('Creando servicios...');
    const servicios = [
      {
        name: 'Corte de cabello',
        description: 'Corte de cabello profesional',
        duration: 30,
        price: 15000,
        category: 'corte',
        isActive: true
      },
      {
        name: 'Afeitado clásico',
        description: 'Afeitado tradicional con navaja',
        duration: 30,
        price: 12000,
        category: 'barba',
        isActive: true
      }
    ];

    const createdServices = await Service.create(servicios);
    console.log('Servicios creados:', createdServices.map(s => ({
      _id: s._id,
      nombre: s.name,
      duracion: s.duration,
      precio: s.price
    })));

    // 3. Crear cita
    console.log('Creando cita...');
    const service = createdServices[0]; // Corte de cabello
    const fecha = '2024-05-20';
    const hora = '10:00';
    const newAppointment = await Appointment.create({
      client: testUser._id,
      service: service._id,
      date: new Date(fecha + 'T' + hora),
      status: 'pendiente',
      notes: 'Cita de prueba inicial',
      duration: service.duration,
      price: service.price
    });

    const appointmentWithRefs = await Appointment.findById(newAppointment._id)
      .populate('client')
      .populate('service');
    console.log('Cita creada:', {
      _id: appointmentWithRefs._id,
      nombre: appointmentWithRefs.client.name,
      email: appointmentWithRefs.client.email,
      fecha: appointmentWithRefs.date.toISOString().split('T')[0],
      hora: appointmentWithRefs.date.toTimeString().slice(0, 5),
      servicio: appointmentWithRefs.service.name,
      estado: appointmentWithRefs.status,
      comentario: appointmentWithRefs.notes,
      duracion: appointmentWithRefs.duration,
      precio: appointmentWithRefs.price
    });

    // 4. Modificar cita
    console.log('Modificando cita...');
    const nuevaFecha = '2024-05-20';
    const nuevaHora = '11:00';
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      newAppointment._id,
      {
        date: new Date(nuevaFecha + 'T' + nuevaHora),
        status: 'confirmada',
        notes: 'Cita modificada de prueba'
      },
      { 
        new: true,
        runValidators: true
      }
    ).populate('client')
     .populate('service');

    console.log('Cita modificada:', {
      _id: updatedAppointment._id,
      nombre: updatedAppointment.client.name,
      email: updatedAppointment.client.email,
      fecha: updatedAppointment.date.toISOString().split('T')[0],
      hora: updatedAppointment.date.toTimeString().slice(0, 5),
      servicio: updatedAppointment.service.name,
      estado: updatedAppointment.status,
      comentario: updatedAppointment.notes,
      duracion: updatedAppointment.duration,
      precio: updatedAppointment.price
    });

    // 5. Eliminar cita
    console.log('Eliminando cita...');
    const deletedAppointment = await Appointment.findByIdAndDelete(newAppointment._id);
    console.log('Cita eliminada:', {
      _id: deletedAppointment._id,
      fecha: deletedAppointment.date.toISOString().split('T')[0],
      hora: deletedAppointment.date.toTimeString().slice(0, 5),
      estado: deletedAppointment.status
    });

    // 6. Verificar eliminación
    console.log('Verificando eliminación...');
    const verifyDeleted = await Appointment.findById(newAppointment._id);
    if (!verifyDeleted) {
      console.log('Verificación exitosa: La cita fue eliminada correctamente');
    }

    await mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  } catch (error) {
    console.error('Error en las pruebas:', error);
    if (error.response) {
      console.error('Detalles del error:', error.response.data);
    }
    await mongoose.disconnect();
  }
};

testAppointments(); 