const db = require('../config/database');

const PodModel = {};

// Crear la tabla de POD si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS pod (
    id INT AUTO_INCREMENT PRIMARY KEY,
    delivery_id INT NOT NULL,
    image VARCHAR(255),
    observation TEXT,
    test_image VARCHAR(255)
  )
`, (err) => {
  if (err) {
    console.error('Error creating the POD table: ' + err);
  } else {
    console.log('The POD table was created successfully.');
  }
});

PodModel.createPod = (newPod, callback) => {
  db.query('INSERT INTO pod SET ?', newPod, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    newPod.id = result.insertId;
    callback(null, newPod);
  });
};

PodModel.getPodByDeliveryId = (deliveryId, callback) => {
  db.query('SELECT * FROM pod WHERE delivery_id = ?', [deliveryId], (err, pod) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, pod);
  });
};

module.exports = PodModel;
