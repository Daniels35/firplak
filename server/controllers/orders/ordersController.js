const OrdersModel = require('../../models/ordersModel');

// Controlador para crear un nuevo pedido
exports.createOrder = (req, res) => {
  const { client_name, delivery_address, products, user_id, email, phone_number, payment_method_id, price, payment_status_id } = req.body;

  if (!client_name || !delivery_address || !products || !user_id || !email || !phone_number || !payment_method_id || !price || !payment_status_id) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  const newOrder = req.body;
  newOrder.products = JSON.stringify(newOrder.products);

  OrdersModel.createOrder(newOrder, (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el pedido', err });
    }
    res.json({ message: 'Pedido creado con éxito', order });
  });
};

// Obtener todos los pedidos
exports.getAllOrders = (req, res) => {
  OrdersModel.getAllOrders((err, orders) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los pedidos' });
    }
    res.json(orders);
  });
};

// Obtener un pedido por su ID
exports.getOrderById = (req, res) => {
  const id = req.params.id;
  OrdersModel.getOrderById(id, (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener el pedido' });
    }
    res.json(order);
  });
};

// Actualizar un pedido por su ID
exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const updatedOrder = req.body;
  OrdersModel.updateOrder(id, updatedOrder, (err, order) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el pedido' });
    }
    res.json({ message: 'Pedido actualizado con éxito', order });
  });
};

// Eliminar un pedido por su ID
exports.deleteOrder = (req, res) => {
  const id = req.params.id;
  OrdersModel.deleteOrder(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
    res.json({ message: 'Pedido eliminado con éxito', result });
  });
};

