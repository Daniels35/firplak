const db = require('../config/database');

const CategoriasModel = {};

// Crear la tabla de categorías si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla de categorías: ' + err);
  } else {
    console.log('La tabla de categorías se creó con éxito.');
  }
});

// Obtener todas las categorías de productos
CategoriasModel.getAll = (callback) => {
  db.query('SELECT * FROM categorias', (err, categorias) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, categorias);
  });
};

// Obtener una categoría por su ID
CategoriasModel.getById = (id, callback) => {
  db.query('SELECT * FROM categorias WHERE id = ?', [id], (err, categoria) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, categoria[0]);
  });
};

// Crear una nueva categoría de producto
CategoriasModel.create = (nuevaCategoria, callback) => {
  db.query('INSERT INTO categorias SET ?', nuevaCategoria, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    nuevaCategoria.id = result.insertId;
    callback(null, nuevaCategoria);
  });
};

// Actualizar una categoría por su ID
CategoriasModel.update = (id, categoriaActualizada, callback) => {
  db.query('UPDATE categorias SET ? WHERE id = ?', [categoriaActualizada, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    categoriaActualizada.id = id;
    callback(null, categoriaActualizada);
  });
};

// Eliminar una categoría por su ID
CategoriasModel.delete = (id, callback) => {
  db.query('DELETE FROM categorias WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = CategoriasModel;
