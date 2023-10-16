const UsersModel = require('../models/usersModel');

// Obtener todos los usuarios
exports.getAllUsers = (req, res) => {
  UsersModel.getAll((err, users) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(users);
  });
};

// Obtener usuarios por ID
exports.getUserById = (req, res) => {
  const id = req.params.id;
  UsersModel.getUserById(id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el usuario' });
    }
    res.json(user);
  });
};

// Crear nuevo usuario
exports.createUser = (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.email || !newUser.role) {
    return res.status(400).json({ error: 'Nombre, Correo Electronico y rol son requeridos' });
  }

  UsersModel.createUser(newUser, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el usuario' });
    }
    res.json({ message: 'Usuario agregado con éxito', user });
  });
};

// Actualizar usuario por ID
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  UsersModel.updateUser(id, updatedUser, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
    res.json({ message: 'Usuario actualizado con éxito', user });
  });
};

// Eliminar usuario por ID
exports.deleteUser = (req, res) => {
  const id = req.params.id;
  UsersModel.deleteUser(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
    res.json({ message: 'Usuario eliminado con éxito', result });
  });
};
