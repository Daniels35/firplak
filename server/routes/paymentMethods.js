const express = require('express');
const router = express.Router();
const paymentMethodsController = require('../controllers/paymentMethodsController');

// Route to get all payment methods
router.get('/payment-methods', paymentMethodsController.getAllPaymentMethods);

// Route to get a payment method by its ID
router.get('/payment-methods/:id', paymentMethodsController.getPaymentMethodById);

// Route to create a new payment method
router.post('/payment-methods', paymentMethodsController.createPaymentMethod);

// Route to update a payment method by its ID
router.put('/payment-methods/:id', paymentMethodsController.updatePaymentMethod);

// Route to delete a payment method by its ID
router.delete('/payment-methods/:id', paymentMethodsController.deletePaymentMethod);

module.exports = router;
