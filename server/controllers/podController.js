const PodModel = require('../models/podModel');

// Controlador para crear un nuevo registro en la tabla "POD"
exports.createPod = (req, res) => {
  const { delivery_id, observation } = req.body;
  const newPod = {
    delivery_id,
    observation,
  };

  if (req.file) {
    // Procesar la imagen de prueba (si se proporciona)
    // Puedes usar una lógica similar a la que usas para productos con Cloudinary.
    newPod.test_image = 'URL_de_la_imagen_de_prueba'; // Reemplaza con la URL de la imagen subida.
  }

  PodModel.createPod(newPod, (err, pod) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el registro en la tabla POD', err });
    }
    res.json({ message: 'Registro en la tabla POD creado con éxito', pod });
  });
};

// Controlador para obtener registros de la tabla "POD" por ID de documento de entrega
exports.getPodByDeliveryId = (req, res) => {
  const { deliveryId } = req.params;

  PodModel.getPodByDeliveryId(deliveryId, (err, pod) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros de la tabla POD' });
    }
    res.json(pod);
  });
};
