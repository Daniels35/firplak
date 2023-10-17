const db = require('../../config/database');
const uuid = require('uuid');

const InventoriesPto1Model = {};

// Crea la tabla 'pto1' si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS pto1 (
    id VARCHAR(36) DEFAULT (UUID()),
    product_id VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    orden_id VARCHAR(36) NOT NULL,
    transfer_date VARCHAR(36) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the pto1 table: ' + err);
  } else {
    console.log('The pto1 table was created successfully.');
  }
});

// Resto del código del modelo para obtener, crear, actualizar y eliminar registros en 'pto1'

module.exports = InventoriesPto1Model;

// Obtener todos los registros de inventario Pto1
InventoriesPto1Model.getAll = (callback) => {
  db.query('SELECT * FROM pto1', (err, inventories) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, inventories);
  });
};

// Obtener un registro de inventario Pto1 por su ID
InventoriesPto1Model.getInventoryById = (id, callback) => {
  db.query('SELECT * FROM pto1 WHERE id = ?', [id], (err, inventory) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, inventory[0]);
  });
};

// Crear un nuevo registro de inventario Pto1
InventoriesPto1Model.createInventory = (newInventory, callback) => {
  newInventory.id = uuid.v4();
  db.query('INSERT INTO pto1 SET ?', newInventory, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, newInventory);
  });
};

// Actualizar un registro de inventario Pto1 por su ID
InventoriesPto1Model.updateInventory = (id, updatedInventory, callback) => {
  db.query('UPDATE pto1 SET ? WHERE id = ?', [updatedInventory, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedInventory.id = id;
    callback(null, updatedInventory);
  });
};

// Eliminar un registro de inventario Pto1 por su ID
InventoriesPto1Model.deleteInventory = (id, callback) => {
  db.query('DELETE FROM pto1 WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = InventoriesPto1Model;
