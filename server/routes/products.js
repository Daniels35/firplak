const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const cloudinary = require('cloudinary').v2;
const upload = require('../config/multer');
const fs = require('fs');

// Ruta para obtener todos los productos
router.get('/products', productsController.getAllProducts);

// Ruta para obtener un producto por su ID
router.get('/products/:id', productsController.getProductById);

// Ruta para crear un nuevo producto con imagen
router.post('/products', upload.single('image'), (req, res) => {
    const newProduct = req.body;
  
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category_id || !newProduct.color_id) {
      return res.status(400).json({ error: 'Nombre, descripción, precio, categoria y color son requeridos' });
    }
  
    if (req.file) {
      // Si se subió una imagen, sube la imagen a Cloudinary
      cloudinary.uploader.upload(req.file.path, (error, result) => {
        
        // Borra el archivo local después de la subida a Cloudinary
        fs.unlinkSync(req.file.path); // Elimina el archivo del sistema de archivos local
        if (error) {
          return res.status(500).json({ error: 'Error al subir la imagen a Cloudinary', error });
        }
  
        // `result.url` contiene el enlace de la imagen en Cloudinary
        const imageUrl = result.url;
  
        // Asigna la URL de la imagen al campo "image" del nuevo producto
        newProduct.image = imageUrl;
  
        // Crea el producto en la base de datos
        productsController.createProductWithImage(newProduct, (err, product) => {
          if (err) {
            return res.status(500).json({ error: 'Error al crear el producto', err });
          }
          res.json({ message: 'Producto agregado con éxito', product });
        });
      });
    } else {
      // Si no se subió una imagen, crea el producto en la base de datos sin la URL de la imagen
      productsController.createProductWithImage(newProduct, (err, product) => {
        if (err) {
          return res.status(500).json({ error: 'Error al crear el producto', err });
        }
        res.json({ message: 'Producto agregado con éxito', product });
      });
    }
  });
  
// Ruta para actualizar un producto por su ID
router.put('/products/:id', productsController.updateProduct);

// Ruta para eliminar un producto por su ID
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
