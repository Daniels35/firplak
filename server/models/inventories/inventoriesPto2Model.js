const db = require('../../config/database');
const uuid = require('uuid');

const InventoriesPto2Model = {};

// Crea la tabla 'pto2' si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS pto2 (
    id VARCHAR(36) DEFAULT (UUID()),
    product_id VARCHAR(255) NOT NULL,
    cantidad INT NOT NULL,
    orden_id VARCHAR(36),
    estado ENUM('pendiente', 'procesando', 'completada') NOT NULL,
    fecha_solicitud VARCHAR(255) NOT NULL,
    date_estimated VARCHAR(36),
    user_id INT NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the pto2 table: ' + err);
  } else {
    console.log('The pto2 table was created successfully.');
  }
});

// Resto del código del modelo para obtener, crear, actualizar y eliminar registros en 'pto2'

module.exports = InventoriesPto2Model;

// Obtener todos los registros de inventario Pto2
InventoriesPto2Model.getAll = (callback) => {
  db.query('SELECT * FROM pto2', (err, inventories) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, inventories);
  });
};

// Obtener un registro de inventario Pto2 por su ID
InventoriesPto2Model.getInventoryById = (id, callback) => {
  db.query('SELECT * FROM pto2 WHERE id = ?', [id], (err, inventory) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, inventory[0]);
  });
};

// Crear un nuevo registro de inventario Pto2
InventoriesPto2Model.createInventory = (newInventory, callback) => {
  newInventory.id = uuid.v4();
  newInventory.orden_id = uuid.v4();
  const currentDate = new Date();
  const options = { timeZone: 'America/Bogota' };
  const formattedDate = currentDate.toLocaleString('es-CO', options);

  currentDate.setDate(currentDate.getDate() + 7);
  const dispatchDateFormatted = currentDate.toLocaleDateString('es-CO', options);

  newInventory.date_estimated = dispatchDateFormatted;

  newInventory.fecha_solicitud = formattedDate;
  
  db.query('INSERT INTO pto2 SET ?', newInventory, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, newInventory);
  });
};

// Actualizar un registro de inventario Pto2 por su ID
InventoriesPto2Model.updateInventory = (id, updatedInventory, callback) => {
  db.query('UPDATE pto2 SET ? WHERE id = ?', [updatedInventory, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedInventory.id = id;
    callback(null, updatedInventory);
  });
};

// Eliminar un registro de inventario Pto2 por su ID
InventoriesPto2Model.deleteInventory = (id, callback) => {
  db.query('DELETE FROM pto2 WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};
