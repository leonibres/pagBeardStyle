const express = require('express');
const {
  createService,
  getServices,
  getService,
  updateService,
  deleteService
} = require('../controllers/service.controller');
const { protect, restrictTo } = require('../middleware/auth.middleware');

const router = express.Router();

// Rutas públicas
router.get('/', getServices);
router.get('/:id', getService);

// Rutas protegidas (solo admin)
router.use(protect);
router.post('/', restrictTo('admin'), createService);
router.patch('/:id', restrictTo('admin'), updateService);
router.delete('/:id', restrictTo('admin'), deleteService);

module.exports = router; 