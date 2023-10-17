const db = require('../../config/database');

const InventoriesPto2Model = require('../../models/inventories/inventoriesPto2Model');

// Obtener todos los registros de inventario Pto2
exports.getAllInventoriesPto2 = (req, res) => {
  InventoriesPto2Model.getAll((err, inventories) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros de inventario Pto2' });
    }
    res.json(inventories);
  });
};

// Obtener un registro de inventario Pto2 por su ID
exports.getInventoryPto2ById = (req, res) => {
  const id = req.params.id;
  InventoriesPto2Model.getInventoryById(id, (err, inventory) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el registro de inventario Pto2' });
    }
    res.json(inventory);
  });
};

// Crear un nuevo registro de inventario Pto2
exports.createInventoryPto2 = (req, res) => {
  const newInventory = req.body;

  if (!newInventory.product_id || !newInventory.cantidad || !newInventory.estado) {
    return res.status(400).json({ error: 'Los campos product_id, cantidad, orden_id y estado son obligatorios' });
  }

  InventoriesPto2Model.createInventory(newInventory, (err, inventory) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el registro de inventario Pto2' });
    }
    res.json({ message: 'Registro de inventario Pto2 agregado con éxito', inventory });
  });
};

// Actualizar un registro de inventario Pto2 por su ID
exports.updateInventoryPto2 = (req, res) => {
  const id = req.params.id;
  const updatedInventory = req.body;

  InventoriesPto2Model.updateInventory(id, updatedInventory, (err, inventory) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el registro de inventario Pto2', err });
    }
    res.json({ message: 'Registro de inventario Pto2 actualizado con éxito', inventory });
  });
};

// Eliminar un registro de inventario Pto2 por su ID
exports.deleteInventoryPto2 = (req, res) => {
  const id = req.params.id;
  InventoriesPto2Model.deleteInventory(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el registro de inventario Pto2' });
    }
    res.json({ message: 'Registro de inventario Pto2 eliminado con éxito', result });
  });
};
