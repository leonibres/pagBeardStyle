const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  cancelAppointment
} = require('../controllers/appointment.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(protect);

// Rutas públicas para usuarios autenticados
router.post('/', createAppointment);
router.get('/', getAppointments);
router.get('/:id', getAppointment);

// Rutas para actualizar y cancelar citas
router.patch('/:id', updateAppointment);
router.patch('/:id/cancel', cancelAppointment);

// Rutas solo para administradores
router.get('/admin/all', restrictTo('admin'), getAppointments);

module.exports = router; 