const express = require('express');
const router = express.Router();
const paymentStatesController = require('../controllers/paymentStatesController');

// Route to get all payment states
router.get('/payment-states', paymentStatesController.getAllPaymentStates);

// Route to get a payment state by its ID
router.get('/payment-states/:id', paymentStatesController.getPaymentStateById);

// Route to create a new payment state
router.post('/payment-states', paymentStatesController.createPaymentState);

// Route to update a payment state by its ID
router.put('/payment-states/:id', paymentStatesController.updatePaymentState);

// Route to delete a payment state by its ID
router.delete('/payment-states/:id', paymentStatesController.deletePaymentState);

module.exports = router;
