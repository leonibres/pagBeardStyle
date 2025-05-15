const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const { body } = require('express-validator');

// Validación para el registro
const validarRegistro = [
  body('nombre').trim().notEmpty().withMessage('El nombre es requerido'),
  body('apellido').trim().notEmpty().withMessage('El apellido es requerido'),
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('telefono').trim().notEmpty().withMessage('El teléfono es requerido')
];

// Validación para el login
const validarLogin = [
  body('email').isEmail().withMessage('Ingrese un email válido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

// Rutas
router.post('/register', validarRegistro, clienteController.register);
router.post('/login', validarLogin, clienteController.login);

module.exports = router; 