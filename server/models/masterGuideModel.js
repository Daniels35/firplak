const db = require('../config/database');

const MasterGuideModel = {};

// Crear la tabla de guías maestras si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS master_guides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_date VARCHAR(36),
    name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    delivery_address VARCHAR(255) NOT NULL,
    orders_delivery JSON NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the master guides table: ' + err);
  } else {
    console.log('The master guides table was created successfully.');
  }
});

// Añadir una orden de entrega a una guía maestra
MasterGuideModel.addOrderToMasterGuide = (masterGuideId, orderId, callback) => {
  db.query('INSERT INTO orders_delivery (master_guide_id, order_id) VALUES (?, ?)', [masterGuideId, orderId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.insertId);
  });
};

module.exports = MasterGuideModel;
