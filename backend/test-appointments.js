const axios = require('axios');

const API_URL = 'http://localhost:8000/api';

const testAppointments = async () => {
  try {
    // 1. Login para obtener token
    console.log('1. Intentando login...');
    const loginResponse = await axios.post(`${API_URL}/auth/login`, {
      email: 'prueba@example.com',
      password: '123456'
    });
    
    const token = loginResponse.data.token;
    console.log('Login exitoso, token obtenido');

    // 2. Crear una cita
    console.log('\n2. Intentando crear una cita...');
    const citaResponse = await axios.post(
      `${API_URL}/appointments`,
      {
        nombre: 'Usuario Prueba',
        email: 'prueba@example.com',
        telefono: '1234567890',
        fecha: '2024-05-15',
        hora: '10:00',
        servicio: 'Corte de cabello',
        estado: 'pendiente',
        comentario: 'Cita de prueba'
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    console.log('Cita creada:', citaResponse.data);

    // 3. Obtener lista de citas
    console.log('\n3. Obteniendo lista de citas...');
    const listResponse = await axios.get(
      `${API_URL}/appointments`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    
    console.log('Lista de citas:', listResponse.data);

  } catch (error) {
    console.error('Error en las pruebas:', error.response ? error.response.data : error.message);
  }
};

testAppointments(); 