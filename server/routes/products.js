const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Ruta para obtener todos los productos
router.get('/products', productsController.getAllProducts);

// Ruta para obtener un producto por su ID
router.get('/products/:id', productsController.getProductById);

// Ruta para crear un nuevo producto
router.post('/products', productsController.createProduct);

// Ruta para actualizar un producto por su ID
router.put('/products/:id', productsController.updateProduct);

// Ruta para eliminar un producto por su ID
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
