const db = require('../../config/database');
const InventoriesPto1Controller = require('../inventories/inventoriesPto1Controller');

// Mover productos de Pto2 a Pto1 por su ID
exports.moveProductsToPto1 = (req, res) => {
  const id = req.params.id; // Obtiene el ID de los parámetros de la solicitud

  // Iniciar una transacción para garantizar la consistencia de la base de datos
  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al iniciar la transacción', err });
    }

    // Realiza una consulta SELECT en la tabla pto2 para obtener los datos por ID
    db.query('SELECT * FROM pto2 WHERE id = ?', [id], (err, results) => {
      if (err) {
        db.rollback(() => {
          res.status(500).json({ error: 'Error al obtener los datos de pto2 por ID', err });
        });
        return;
      }

      if (results.length === 0) {
        db.rollback(() => {
          res.status(404).json({ error: 'No se encontraron datos en pto2 para el ID proporcionado' });
        });
        return;
      }
      const productData = results[0];
      // Verifica si el estado es "completado" antes de realizar la inserción en Pto1
      if (productData.estado === 'completada') {
        // Llama al controlador para crear un inventario en Pto1
        const simulatedReq = {
          body: {
            orden_id: productData.orden_id,
            cantidad: productData.cantidad,
            product_id: productData.product_id
          }
        };
        InventoriesPto1Controller.createInventoryPto1(simulatedReq, res);

        if (err) {
          db.rollback(() => {
            res.status(500).json({ error: 'Error al crear el registro de inventario Pto1', err });
          });
          return;
        }
        // Elimina los datos de Pto2
        db.query('DELETE FROM pto2 WHERE id = ?;', [id], (err, deleteResult) => {
          if (err) {
            db.rollback(() => {
              res.status(500).json({ error: 'Error al eliminar los datos de pto2', err });
            });
          } else {
            // Confirma la transacción
            db.commit((commitErr) => {
              if (commitErr) {
                res.status(500).json({ error: 'Error al confirmar la transacción', commitErr });
              }
            });
          }
        });
      }
    });
  });
};
