const express = require('express');
const router = express.Router();
const podController = require('../controllers/podController');
const cloudinary = require('cloudinary').v2;
const upload = require('../config/multer');
const fs = require('fs');

// Ruta para crear un nuevo registro en la tabla "pod" con imágenes
router.post('/pods', upload.fields([{ name: 'image' }, { name: 'test_image' }]), (req, res) => {
    const newPod = req.body;
  
    if (!newPod.orders_document_id || !newPod.state) {
      return res.status(400).json({ error: 'Delivery document ID and state are required' });
    }

      // Verificar si ya existe un registro con el mismo orders_document_id
  podController.checkIfPodExists(newPod.orders_document_id, (err, exists) => {
    if (err) {
      return res.status(500).json({ error: 'Error checking for existing POD', err });
    }

    if (exists) {
      return res.json({ message: 'Ya se ha ingresado el POD de esta orden de entrega, por favor comuníquese con el administrador' });
    }
  
    if (req.files) {
      // Subir la imagen principal ("image") a Cloudinary
      cloudinary.uploader.upload(req.files.image[0].path, (error, imageResult) => {
        fs.unlinkSync(req.files.image[0].path);
        if (error) {
          return res.status(500).json({ error: 'Error uploading the main image to Cloudinary', error });
        }
        
        const imageUrl = imageResult.url;
        console.log("link de Cloudinary para la primera imagen: ", imageUrl);
        newPod.image = imageUrl;
        
        if (req.files.test_image) {
          // Subir la imagen de prueba ("test_image") a Cloudinary
          cloudinary.uploader.upload(req.files.test_image[0].path, (testImageError, testImageResult) => {
             fs.unlinkSync(req.files.test_image[0].path);
            if (testImageError) {
              return res.status(500).json({ error: 'Error uploading the test image to Cloudinary', testImageError });
            }
            
            const testImageUrl = testImageResult.url;
        
            // Asignar la URL de la imagen de prueba a la propiedad "test_image" de "newPod"
            newPod.test_image = testImageUrl;
          });
        }
        // Luego, llama a la función para crear el registro en la base de datos
        podController.createPodWithImages(newPod, (err, pod) => {
          if (err) {
            return res.status(500).json({ error: 'Error creating the POD record', err });
          }
          res.json({ message: 'POD record added successfully', pod });
        });
      });
    } else {
      // En caso de que no se proporcionen imágenes
      return res.status(400).json({ error: 'Image files are required' });
    }
  });
});

// Ruta para obtener todos los registros de la tabla "pod"
router.get('/pods', podController.getAllPods);

// Ruta para obtener un registro de la tabla "pod" por su ID
router.get('/pods/:id', podController.getPodById);

// Ruta para actualizar un registro de la tabla "pod" por su ID
router.put('/pods/:id', podController.updatePodById);

// Ruta para eliminar un registro de la tabla "pod" por su ID
router.delete('/pods/:id', podController.deletePodById);


module.exports = router;
