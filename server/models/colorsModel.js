const db = require('../config/database');

const ColorsModel = {};

// Crear la tabla de colores si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS colors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name1 VARCHAR(255) NOT NULL,
    name2 VARCHAR(255),
    code VARCHAR(255)
  )
`, (err) => {
  if (err) {
    console.error('Error creating the colors table: ' + err);
  } else {
    console.log('The colors table was created successfully.');
  }
});

// Obtener todos los colores
ColorsModel.getAll = (callback) => {
  db.query('SELECT * FROM colors', (err, colors) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, colors);
  });
};

// Obtener un color por su ID
ColorsModel.getColorById = (id, callback) => {
  db.query('SELECT * FROM colors WHERE id = ?', [id], (err, color) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, color[0]);
  });
};

// Crear un nuevo color
ColorsModel.createColor = (newColor, callback) => {
  db.query('INSERT INTO colors SET ?', newColor, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    newColor.id = result.insertId;
    callback(null, newColor);
  });
};

// Actualizar un color por su ID
ColorsModel.updateColor = (id, updatedColor, callback) => {
  db.query('UPDATE colors SET ? WHERE id = ?', [updatedColor, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedColor.id = id;
    callback(null, updatedColor);
  });
};

// Eliminar un color por su ID
ColorsModel.deleteColor = (id, callback) => {
  db.query('DELETE FROM colors WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = ColorsModel;
