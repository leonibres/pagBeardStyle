const axios = require('axios');

const testRegister = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/register', {
      name: 'Usuario Prueba',
      email: 'prueba@example.com',
      password: '123456'
    });
    console.log('Registro exitoso:', response.data);
  } catch (error) {
    console.error('Error en el registro:', error.response ? error.response.data : error.message);
  }
};

testRegister(); 