const ColorsModel = require('../models/colorsModel');

// Obtener todos los colores
exports.getAllColors = (req, res) => {
  ColorsModel.getAll((err, colors) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los colores' });
    }
    res.json(colors);
  });
};

// Obtener un color por su ID
exports.getColorById = (req, res) => {
  const id = req.params.id;
  ColorsModel.getColorById(id, (err, color) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el color' });
    }
    res.json(color);
  });
};

// Crear un nuevo color
exports.createColor = (req, res) => {
    const newColor = req.body;
    
    if (!newColor.name1) {
      return res.status(400).json({ error: 'El Nombre del color es obligatorio' });
    }
    
    ColorsModel.createColor(newColor, (err, color) => {
      if (err) {
        return res.status(500).json({ error: 'Error al crear el color' });
      }
      res.json({ message: 'Color agregado con éxito', color });
    });
  };
  
  // Actualizar un color por su ID
  exports.updateColor = (req, res) => {
    const id = req.params.id;
    const updatedColor = req.body;
    ColorsModel.updateColor(id, updatedColor, (err, color) => {
      if (err) {
        return res.status(500).json({ error: 'Error al actualizar el color' });
      }
      res.json({ message: 'Color actualizado con éxito', color });
    });
  };  

// Eliminar un color por su ID
exports.deleteColor = (req, res) => {
  const id = req.params.id;
  ColorsModel.deleteColor(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el color' });
    }
    res.json({ message: 'Color eliminado con éxito', result });
  });
};
