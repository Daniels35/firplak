const ProductModel = require('../models/productsModel');

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

// Crear un nuevo producto
exports.createProduct = (req, res) => {
  const newProduct = req.body;

  if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category_id || !newProduct.color_id) {
    return res.status(400).json({ error: 'Nombre, descripción, precio, categoria y color son requeridos' });
  }

  ProductModel.createProduct(newProduct, (err, product) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el producto', err });
    }
    res.json({ message: 'Producto agregado con éxito', product });
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
