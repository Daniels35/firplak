const ProductModel = require('../models/productsModel');
const uuid = require('uuid');
const db = require('../config/database');

// Obtener todos los productos
exports.getAllProducts = (req, res) => {
  ProductModel.getAll((err, products) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los productos', err });
    }
    res.json(products);
  });
};

// Obtener un producto por su ID
exports.getProductById = (req, res) => {
  const id = req.params.id;
  ProductModel.getProductById(id, (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el producto', err });
    }
    res.json(product);
  });
};

// Crear un nuevo producto en la base de datos con la URL de la imagen //REVISAR//
exports.createProductWithImage = (newProduct, callback) => {
    newProduct.id = uuid.v4();
    db.query('INSERT INTO products SET ?', newProduct, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, newProduct);
    });
  };
  
// Actualizar un producto por su ID
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const updatedProduct = req.body;
  ProductModel.updateProduct(id, updatedProduct, (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el producto' });
    }
    res.json({ message: 'Producto actualizado con éxito', product });
  });
};

// Eliminar un producto por su ID
exports.deleteProduct = (req, res) => {
  const id = req.params.id;
  ProductModel.deleteProduct(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el producto' });
    }
    res.json({ message: 'Producto eliminado con éxito', result });
  });
};
