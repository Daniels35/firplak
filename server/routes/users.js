const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// Ruta para obtener todos los usuarios
router.get('/users', usersController.getAllUsers);

// Ruta para obtener un usuario por su ID
router.get('/users/:id', usersController.getUserById);

// Ruta para crear un nuevo usuario
router.post('/users', usersController.createUser);

// Ruta para actualizar un usuario por su ID
router.put('/users/:id', usersController.updateUser);

// Ruta para eliminar un usuario por su ID
router.delete('/users/:id', usersController.deleteUser);

module.exports = router;
