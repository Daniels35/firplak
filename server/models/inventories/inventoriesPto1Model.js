const db = require('../../config/database');
const uuid = require('uuid');

const InventoriesPto1Model = {};

// Crea la tabla 'pto1' si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS pto1 (
    product_id VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    orden_id VARCHAR(36) NOT NULL,
    transfer_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
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
InventoriesPto1Model.getInventoryById = (product_id, callback) => {
  db.query('SELECT * FROM pto1 WHERE product_id = ?', [product_id], (err, inventory) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, inventory[0]);
  });
};

// Crear un nuevo registro de inventario Pto1
InventoriesPto1Model.createInventory = (newInventory, callback) => {
  db.query('SELECT * FROM pto1 WHERE product_id = ?', [newInventory.product_id], (err, existingInventory) => {
    if (err) {
      return callback(err, null);
    }

    if (existingInventory.length > 0) {
      // Actualizar el registro existente
      const updatedInventory = existingInventory[0];
      updatedInventory.cantidad += newInventory.cantidad;
      updatedInventory.orden_id = newInventory.orden_id;
      
      // Utiliza NOW() para obtener la fecha y hora actuales en la zona horaria de MySQL
      db.query('UPDATE pto1 SET cantidad = ?, orden_id = ?, transfer_date = NOW() WHERE product_id = ?',
        [updatedInventory.cantidad, updatedInventory.orden_id, newInventory.product_id],
        (err, result) => {
          if (err) {
            return callback(err, null);
          }
          callback(null, updatedInventory);
        }
      );
    } else {
      // Insertar un nuevo registro con la fecha actual
      db.query('INSERT INTO pto1 (product_id, cantidad, orden_id, transfer_date) VALUES (?, ?, ?, NOW())',
        [newInventory.product_id, newInventory.cantidad, newInventory.orden_id],
        (err, result) => {
          if (err) {
            return callback(err, null);
          }
          newInventory.transfer_date = new Date().toISOString(); 
          callback(null, newInventory);
        }
      );
    }
  });
};



// Actualizar un registro de inventario Pto1 por su ID
InventoriesPto1Model.updateInventory = (product_id, updatedInventory, callback) => {
  db.query('UPDATE pto1 SET ? WHERE product_id = ?', [updatedInventory, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedInventory.id = id;
    callback(null, updatedInventory);
  });
};

// Eliminar un registro de inventario Pto1 por su ID
InventoriesPto1Model.deleteInventory = (product_id, callback) => {
  db.query('DELETE FROM pto1 WHERE product_id = ?', [product_id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = InventoriesPto1Model;
