const mongoose = require('mongoose');
const Service = require('./src/models/service.model');
require('dotenv').config();

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
  },
  {
    name: 'Corte y barba',
    description: 'Servicio completo de corte de cabello y arreglo de barba',
    duration: 60,
    price: 25000,
    category: 'combo',
    isActive: true
  },
  {
    name: 'Arreglo de barba',
    description: 'Perfilado y arreglo de barba',
    duration: 20,
    price: 10000,
    category: 'barba',
    isActive: true
  },
  {
    name: 'Tinte para cabello',
    description: 'Aplicación de tinte para cabello',
    duration: 90,
    price: 35000,
    category: 'tratamiento',
    isActive: true
  },
  {
    name: 'Tratamiento capilar',
    description: 'Tratamiento hidratante para cabello',
    duration: 45,
    price: 20000,
    category: 'tratamiento',
    isActive: true
  }
];

const createServices = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado a MongoDB');

    // Eliminar servicios existentes
    await Service.deleteMany({});
    console.log('Servicios anteriores eliminados');

    // Crear nuevos servicios
    const createdServices = await Service.create(servicios);
    console.log('Servicios creados:', createdServices);

    mongoose.disconnect();
    console.log('Desconectado de MongoDB');
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
};

createServices(); 