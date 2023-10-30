const PodModel = require('../models/podModel');
const uuid = require('uuid');
const db = require('../config/database');

// Importa el servicio de correo electrónico
const emailService = require('../config/email');

// La lógica para crear el registro de POD
exports.createPodWithImages = (newPod, callback) => {
  newPod.id = uuid.v4();

  db.query('INSERT INTO pod SET ?', newPod, (err, result) => {
    if (err) {
      // Manejo de errores al guardar en la base de datos
      return callback(err, null);
    }
    
    // Envía correos electrónicos
    emailService.sendAdminEmail(
      'Nuevo registro de POD',
      `Se ha registrado un nuevo POD con ID de orden ${newPod.orders_document_id}.`
    );

    // Solo para prueba, sin dirección de correo de usuario ni archivo adjunto
    emailService.sendUserEmail(
      'Correo de Prueba',
      'Este es un correo de prueba sin dirección de correo de usuario ni archivo adjunto.'
    );

    callback(null, newPod);
  });
};


//Buscar por "orders_document_id"
exports.checkIfPodExists = (orders_document_id, callback) => {
  db.query('SELECT * FROM pod WHERE orders_document_id = ?', orders_document_id, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length > 0) {
      // Ya existe un registro con el mismo orders_document_id
      callback(null, true);
    } else {
      // No existe un registro con el mismo orders_document_id
      callback(null, false);
    }
  });
};

// Obtener todos los registros de la tabla "pod"
exports.getAllPods = (req, res) => {
  PodModel.getAllPods((err, pods) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros de pod' });
    }
    res.json(pods);
  });
};

// Obtener un registro de la tabla "pod" por su ID
exports.getPodById = (req, res) => {
  const id = req.params.id;
  PodModel.getPodById(id, (err, pod) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el registro de pod' });
    }
    res.json(pod);
  });
};

// Actualizar un registro de la tabla "pod" por su ID
exports.updatePodById = (req, res) => {
  const id = req.params.id;
  const updatedPod = req.body;
  PodModel.updatePodById(id, updatedPod, (err, pod) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el registro de pod' });
    }
    res.json({ message: 'Registro de pod actualizado con éxito', pod });
  });
};

// Eliminar un registro de la tabla "pod" por su ID
exports.deletePodById = (req, res) => {
  const id = req.params.id;
  PodModel.deletePodById(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el registro de pod' });
    }
    res.json({ message: 'Registro de pod eliminado con éxito', result });
  });
};
