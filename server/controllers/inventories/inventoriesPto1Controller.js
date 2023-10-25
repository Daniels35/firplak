const db = require('../../config/database');

const InventoriesPto1Model = require('../../models/inventories/inventoriesPto1Model');

// Obtener todos los registros de inventario Pto1
exports.getAllInventoriesPto1 = (req, res) => {
  InventoriesPto1Model.getAll((err, inventories) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los registros de inventario Pto1' });
    }
    res.json(inventories);
  });
};

// Obtener un registro de inventario Pto1 por su ID (product_id)
exports.getInventoryPto1ById = (req, res) => {
  const product_id = req.params.id;
  InventoriesPto1Model.getInventoryById(product_id, (err, inventory) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el registro de inventario Pto1' });
    }
    res.json(inventory);
  });
};

// Crear un nuevo registro de inventario Pto1
exports.createInventoryPto1 = (req, res) => {
  const newInventory = req.body;

  if (!newInventory.product_id || !newInventory.cantidad || !newInventory.orden_id ) {
    return res.status(400).json({ error: 'Los campos product_id, cantidad, orden_id y transfer_date son obligatorios' });
  }

  InventoriesPto1Model.createInventory(newInventory, (err, inventory) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el registro de inventario Pto1', err });
    }
    res.json({ message: 'Registro de inventario PTO2 movido a PTO1 con éxito' });
  });
};

// Actualizar un registro de inventario Pto1 por su ID
exports.updateInventoryPto1 = (req, res) => {
  const id = req.params.id;
  const updatedInventory = req.body;

  InventoriesPto1Model.updateInventory(id, updatedInventory, (err, inventory) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el registro de inventario Pto1' });
    }
    res.json({ message: 'Registro de inventario Pto1 actualizado con éxito', inventory });
  });
};

// Eliminar un registro de inventario Pto1 por su ID (product_id)
exports.deleteInventoryPto1 = (req, res) => {
  const product_id = req.params.id;
  InventoriesPto1Model.deleteInventory(product_id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el registro de inventario Pto1', err });
    }
    res.json({ message: 'Registro de inventario Pto1 eliminado con éxito', result });
  });
};
