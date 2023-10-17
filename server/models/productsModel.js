const db = require('../config/database');
const uuid = require('uuid');

const ProductModel = {};

// Crear la tabla de productos si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(36) DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT NOT NULL,
    color_id INT NOT NULL,
    image VARCHAR(255)
  )
`, (err) => {
  if (err) {
    console.error('Error creating the products table: ' + err);
  } else {
    console.log('The products table was created successfully.');
  }
});

// Obtener todos los productos
ProductModel.getAll = (callback) => {
  db.query('SELECT * FROM products', (err, products) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, products);
  });
};

// Obtener un producto por su ID
ProductModel.getProductById = (id, callback) => {
  db.query('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, product[0]);
  });
};

// Crear un nuevo producto REVISAR
// ProductModel.createProductWithImage = (newProduct, callback) => {
//     newProduct.id = uuid.v4();
//     console.log("Antes de inyectarlo: ", newProduct);
//     db.query('INSERT INTO products SET ?', newProduct, (err, result) => {
//       if (err) {
//         return callback(err, null);
//       }
//       console.log("Despues de inyectarlo: ", newProduct);
//       callback(null, newProduct);
//     });
//   };

// Actualizar un producto por su ID
ProductModel.updateProduct = (id, updatedProduct, callback) => {
  db.query('UPDATE products SET ? WHERE id = ?', [updatedProduct, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedProduct.id = id;
    callback(null, updatedProduct);
  });
};

// Eliminar un producto por su ID
ProductModel.deleteProduct = (id, callback) => {
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = ProductModel;
