const db = require('../config/database');

const OrdersModel = {};

// Crear la tabla de pedidos si no existe
db.query(`
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    generated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    client_name VARCHAR(255) NOT NULL,
    delivery_address VARCHAR(255) NOT NULL,
    products JSON NOT NULL,
    user_id INT NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    payment_method_id INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    payment_status_id INT NOT NULL,
    delivery_date VARCHAR(36),
    dispatch_date VARCHAR(36)
  )
`, (err) => {
  if (err) {
    console.error('Error creating the orders table: ' + err);
  } else {
    console.log('The orders table was created successfully.');
  }
});

OrdersModel.createOrder = (newOrder, callback) => {
    const currentDate = new Date();
    const options = { timeZone: 'America/Bogota' };

    // Calcular dispatch_date sumando 1 día a la fecha actual y formatear solo la fecha
    const dispatchDate = new Date(currentDate);
    dispatchDate.setDate(dispatchDate.getDate() + 1);
    const dispatchDateFormatted = dispatchDate.toLocaleDateString('es-CO', options);
    newOrder.dispatch_date = dispatchDateFormatted;

    // Calcular delivery_date sumando 7 días a la fecha actual y formatear solo la fecha
    currentDate.setDate(currentDate.getDate() + 7);
    const formattedDate = currentDate.toLocaleDateString('es-CO', options);
    newOrder.delivery_date = formattedDate;

    // Insertar los datos en la base de datos
    db.query('INSERT INTO orders SET ?', newOrder, (err, result) => {
        if (err) {
            return callback(err, null);
        }
        newOrder.id = result.insertId;
        callback(null, newOrder);
    });
};

// Obtener todos los pedidos
OrdersModel.getAllOrders = (callback) => {
  db.query('SELECT * FROM orders', (err, orders) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, orders);
  });
};

// Obtener un pedido por su ID
OrdersModel.getOrderById = (id, callback) => {
  db.query('SELECT * FROM orders WHERE id = ?', [id], (err, order) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, order[0]);
  });
};

// Actualizar un pedido por su ID
OrdersModel.updateOrder = (id, updatedOrder, callback) => {
  db.query('UPDATE orders SET ? WHERE id = ?', [updatedOrder, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedOrder.id = id;
    callback(null, updatedOrder);
  });
};

// Eliminar un pedido por su ID
OrdersModel.deleteOrder = (id, callback) => {
  db.query('DELETE FROM orders WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = OrdersModel;
