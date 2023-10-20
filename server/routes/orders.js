const express = require('express');
const router = express.Router();
const ordersDeliveryController = require('../controllers/orders/ordersDeliveryController');
const ordersController = require('../controllers/orders/ordersController');
const ordersDeliveryPreviewController = require('../controllers/orders/ordersDeliveryPreviewController');

// Ruta para crear un nuevo pedido
router.post('/orders', ordersController.createOrder);

// Ruta para obtener todos los pedidos
router.get('/orders', ordersController.getAllOrders);

// Ruta para obtener un pedido por su ID
router.get('/orders/:id', ordersController.getOrderById);

// Ruta para actualizar un pedido por su ID
router.put('/orders/:id', ordersController.updateOrder);

// Ruta para eliminar un pedido por su ID
router.delete('/orders/:id', ordersController.deleteOrder);

// Ruta para generar un documento de entregs
router.get('/orders/:id/delivery', ordersDeliveryController.generateDeliveryDocument);

// Ruta para generar una vista previa del documento de entrega
router.get('/orders/:id/delivery/preview', ordersDeliveryPreviewController.previewDeliveryDocument);



module.exports = router;
