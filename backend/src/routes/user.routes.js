const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const User = require('../models/user.model');

const router = express.Router();

// Proteger todas las rutas
router.use(protect);

// Ruta para obtener el perfil del usuario
router.get('/profile', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    }
  });
});

// Ruta para actualizar el perfil del usuario
router.patch('/profile', async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: 'Error al actualizar el perfil'
    });
  }
});

module.exports = router; 