const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriesController');

// Ruta para obtener todas las categorías de productos
router.get('/categorias', categoriasController.getAllCategorias);

// Ruta para obtener una categoría por su ID
router.get('/categorias/:id', categoriasController.getCategoriaById);

// Ruta para crear una nueva categoría de producto
router.post('/categorias', categoriasController.createCategoria);

// Ruta para actualizar una categoría por su ID
router.put('/categorias/:id', categoriasController.updateCategoria);

// Ruta para eliminar una categoría por su ID
router.delete('/categorias/:id', categoriasController.deleteCategoria);

module.exports = router;
