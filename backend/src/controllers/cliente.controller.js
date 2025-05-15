const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/env');

// Generar Token JWT
const generarToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
};

// Registrar nuevo cliente
exports.register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono } = req.body;

    // Verificar si el email ya existe
    const clienteExistente = await Cliente.findOne({ email });
    if (clienteExistente) {
      return res.status(400).json({
        status: 'error',
        message: 'Este email ya está registrado'
      });
    }

    // Crear nuevo cliente
    const cliente = await Cliente.create({
      nombre,
      apellido,
      email,
      password,
      telefono
    });

    // Generar token
    const token = generarToken(cliente._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        cliente: {
          id: cliente._id,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          telefono: cliente.telefono
        }
      }
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al registrar el cliente'
    });
  }
};

// Login de cliente
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verificar si existe el cliente y obtener la contraseña
    const cliente = await Cliente.findOne({ email }).select('+password');
    if (!cliente) {
      return res.status(401).json({
        status: 'error',
        message: 'Email o contraseña incorrectos'
      });
    }

    // 2. Verificar si la contraseña es correcta
    const passwordCorrecta = await cliente.verificarPassword(password);
    if (!passwordCorrecta) {
      return res.status(401).json({
        status: 'error',
        message: 'Email o contraseña incorrectos'
      });
    }

    // 3. Si todo está bien, generar token
    const token = generarToken(cliente._id);

    // 4. Enviar respuesta
    res.status(200).json({
      status: 'success',
      token,
      data: {
        cliente: {
          id: cliente._id,
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          telefono: cliente.telefono
        }
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al iniciar sesión'
    });
  }
}; 