const db = require('../config/database');

const PodModel = {};

// Crear la tabla "pod" si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS pod (
    id VARCHAR(36) DEFAULT (UUID()),
    orders_document_id INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    state ENUM('entregado', 'observacion', 'rechazado') NOT NULL,
    test_image VARCHAR(255),
    observations VARCHAR(255),
    FOREIGN KEY (orders_document_id) REFERENCES orders(id)
  )
`, (err) => {
  if (err) {
    console.error('Error creating the pod table: ' + err);
  } else {
    console.log('The pod table was created successfully.');
  }
});

// Obtener todos los registros de la tabla "pod"
PodModel.getAllPods = (callback) => {
  db.query('SELECT * FROM pod', (err, pods) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, pods);
  });
};

// Obtener un registro de la tabla "pod" por su ID
PodModel.getPodById = (podId, callback) => {
  db.query('SELECT * FROM pod WHERE id = ?', podId, (err, pod) => {
    if (err) {
      return callback(err, null);
    }
    if (pod.length === 0) {
      return callback(null, null);
    }
    callback(null, pod[0]);
  });
};

// Actualizar un registro de la tabla "pod" por su ID
PodModel.updatePodById = (podId, updatedPod, callback) => {
  db.query('UPDATE pod SET ? WHERE id = ?', [updatedPod, podId], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, updatedPod);
  });
};

// Eliminar un registro de la tabla "pod" por su ID
PodModel.deletePodById = (podId, callback) => {
  db.query('DELETE FROM pod WHERE id = ?', podId, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = PodModel;
