const db = require('../../config/database');

// Mover productos de Pto2 a Pto1 por su ID
exports.moveProductsToPto1 = (req, res) => {
  const id = req.params.id; // Obtiene el ID de los parámetros de la solicitud

  // Obtiene la fecha actual
  const currentDate = new Date();
  const options = { timeZone: 'America/Bogota' };
  const formattedDate = currentDate.toLocaleString('es-CO', options);
  
  // Iniciar una transacción para garantizar la consistencia de la base de datos
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al iniciar la transacción', err });
    }

    // Realiza una consulta SELECT en la tabla pto2 para obtener los datos por ID
    db.query('SELECT * FROM pto2 WHERE id = ?', [id], (err, results) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).json({ error: 'Error al obtener los datos de pto2 por ID', err });
        });
      }

      if (results.length === 0) {
        return db.rollback(() => {
          res.status(404).json({ error: 'No se encontraron datos en pto2 para el ID proporcionado' });
        });
      }

      const productData = results[0];
      
      // Verifica si el estado es "completado" antes de realizar la inserción en Pto1
      if (productData.estado === 'completado') {
        // Inserta los datos en Pto1 sin incluir el estado y con transfer_date
        db.query('INSERT INTO pto1 (id, product_id, cantidad, orden_id, transfer_date) VALUES (?, ?, ?, ?, ?);', [productData.id, productData.product_id, productData.cantidad, productData.orden_id, formattedDate], (err, insertResult) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: 'Error al insertar los datos en pto1', err });
            });
          }

          // Confirma la transacción
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                res.status(500).json({ error: 'Error al confirmar la transacción', err });
              });
            }

            // Elimina los datos de Pto2
            db.query('DELETE FROM pto2 WHERE id = ?;', [id], (err, deleteResult) => {
              if (err) {
                return res.status(500).json({ error: 'Error al eliminar los datos de pto2', err });
              }

              res.json({ message: 'Datos movidos con éxito a pto1' });
            });
          });
        });
      } else {
        // Si el estado no es "completado," devuelve un error.
        db.rollback(() => {
          res.status(400).json({ error: 'No se puede mover el producto porque aún no esta completado.' });
        });
      }
    });
  });
};
