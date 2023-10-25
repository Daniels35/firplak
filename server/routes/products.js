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
      cloudinary.uploader.upload(req.file.path, (error, result) => {
        fs.unlinkSync(req.file.path);
        if (error) {
          return res.status(500).json({ error: 'Error al subir la imagen a Cloudinary', error });
        }
        const imageUrl = result.url;
        newProduct.image = imageUrl;
        productsController.createProductWithImage(newProduct, (err, product) => {
          if (err) {
            return res.status(500).json({ error: 'Error al crear el producto', err });
          }
          res.json({ message: 'Producto agregado con éxito', product });
        });
      });
    } else {
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
