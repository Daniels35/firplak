const CategoriasModel = require('../models/categoriesModel');
const LogActionsModel = require('../models/logActionsModel');

// Obtener todas las categorías de productos
exports.getAllCategorias = (req, res) => {
  CategoriasModel.getAll((err, categorias) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener las categorías' });
    }
    res.json(categorias);
  });
};

// Obtener una categoría por su ID
exports.getCategoriaById = (req, res) => {
  const id = req.params.id;
  CategoriasModel.getById(id, (err, categoria) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener la categoría' });
    }
    res.json(categoria);
  });
};

// Crear una nueva categoría de producto
exports.createCategoria = (req, res) => {
  const nuevaCategoria = req.body;

  if (!nuevaCategoria.name) {
    return res.status(400).json({ error: 'El nombre de la categoría es obligatorio' });
  }

  CategoriasModel.create(nuevaCategoria, (err, categoria) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear la categoría' });
    }

    const actionData = {
      affected_table: 'categorias',
      action_type: 'Creación',
      affected_record_id: categoria.id,
    };

    // Ahora que tenemos el ID de la nueva categoría, registra la acción nuevamente
    LogActionsModel.createAction(actionData, (secondErr, secondAction) => {
      if (secondErr) {
        console.error('Error registering the action: ' + secondErr);
      } else {
        console.log('Action registered successfully');
      }
    });

    res.json({ message: 'Categoría agregada con éxito', categoria });
  });
};

// Actualizar una categoría por su ID
exports.updateCategoria = (req, res) => {
  const id = req.params.id;
  const categoriaActualizada = req.body;
  CategoriasModel.update(id, categoriaActualizada, (err, categoria) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
    res.json({ message: 'Categoría actualizada con éxito', categoria });
  });
};

// Eliminar una categoría por su ID
exports.deleteCategoria = (req, res) => {
  const id = req.params.id;
  CategoriasModel.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
    res.json({ message: 'Categoría eliminada con éxito', result });
  });
};
