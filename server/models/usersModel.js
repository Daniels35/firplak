const db = require('../config/database');

const UsersModel = {};

// Crear la tabla de usuarios si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role ENUM('vendedor', 'admin', 'observador') NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the users table: ' + err);
  } else {
    console.log('The users table was created successfully.');
  }
});

// Obtener todos los usuarios
UsersModel.getAll = (callback) => {
  db.query('SELECT * FROM users', (err, users) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, users);
  });
};

// Obtener un usuario por su ID
UsersModel.getUserById = (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, user[0]);
  });
};

// Crear un nuevo usuario
UsersModel.createUser = (newUser, callback) => {
  db.query('INSERT INTO users SET ?', newUser, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    newUser.id = result.insertId;
    callback(null, newUser);
  });
};

// Actualizar un usuario por su ID
UsersModel.updateUser = (id, updatedUser, callback) => {
  db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedUser.id = id;
    callback(null, updatedUser);
  });
};

// Eliminar un usuario por su ID
UsersModel.deleteUser = (id, callback) => {
  db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = UsersModel;
