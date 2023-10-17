// En tu controlador de inventarios (inventoriesController.js)

const db = require('../../config/database');

// Mover productos de Pto2 a Pto1 por orden_id
exports.moveProductsToPto1 = (req, res) => {
  const orderId = req.params.orderId; // Pasas el ID de la orden como parámetro

  // Obtiene la fecha actual
  const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  // Realiza una actualización en la base de datos para cambiar el estado en Pto2 y registrar la fecha de traslado
  db.query('UPDATE pto2 SET state = "completado", transfer_date = ? WHERE orden_id = ?', [currentDate, orderId], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al mover los productos a pto1' });
    }

    // Inserta los productos en Pto1 desde Pto2 y registra la fecha de traslado en Pto1
    db.query('INSERT INTO pto1 (product_id, cantidad, orden_id, transfer_date) SELECT product_id, cantidad, orden_id, ? FROM pto2 WHERE orden_id = ?;', [currentDate, orderId], (err, insertResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error al insertar los productos en pto1' });
      }

      res.json({ message: 'Productos movidos con éxito a pto1' });
    });
  });
};
