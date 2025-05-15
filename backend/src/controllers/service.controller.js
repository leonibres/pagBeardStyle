const Service = require('../models/service.model');
const logger = require('../utils/logger');

// Crear un nuevo servicio
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        service
      }
    });
  } catch (error) {
    logger.error('Error al crear servicio:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al crear el servicio'
    });
  }
};

// Obtener todos los servicios
exports.getServices = async (req, res) => {
  try {
    const query = { isActive: true };
    
    // Filtrar por categoría si se especifica
    if (req.query.category) {
      query.category = req.query.category;
    }

    const services = await Service.find(query).sort('name');

    res.status(200).json({
      status: 'success',
      results: services.length,
      data: {
        services
      }
    });
  } catch (error) {
    logger.error('Error al obtener servicios:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener los servicios'
    });
  }
};

// Obtener un servicio específico
exports.getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Servicio no encontrado'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        service
      }
    });
  } catch (error) {
    logger.error('Error al obtener servicio:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al obtener el servicio'
    });
  }
};

// Actualizar un servicio
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Servicio no encontrado'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        service
      }
    });
  } catch (error) {
    logger.error('Error al actualizar servicio:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al actualizar el servicio'
    });
  }
};

// Desactivar un servicio
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!service) {
      return res.status(404).json({
        status: 'error',
        message: 'Servicio no encontrado'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Servicio desactivado exitosamente'
    });
  } catch (error) {
    logger.error('Error al desactivar servicio:', error);
    res.status(500).json({
      status: 'error',
      message: 'Error al desactivar el servicio'
    });
  }
}; 