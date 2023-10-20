const PaymentStatesModel = require('../models/paymentStatesModel');

// Get all payment states
exports.getAllPaymentStates = (req, res) => {
  PaymentStatesModel.getAll((err, paymentStates) => {
    if (err) {
      return res.status(500).json({ error: 'Error getting payment states' });
    }
    res.json(paymentStates);
  });
};

// Get a payment state by its ID
exports.getPaymentStateById = (req, res) => {
  const id = req.params.id;
  PaymentStatesModel.getPaymentStateById(id, (err, paymentState) => {
    if (err) {
      return res.status(500).json({ error: 'Error getting the payment state' });
    }
    res.json(paymentState);
  });
};

// Create a new payment state
exports.createPaymentState = (req, res) => {
  const newPaymentState = req.body;
  
  if (!newPaymentState.name_state) {
    return res.status(400).json({ error: 'Payment State Name is required' });
  }
  
  PaymentStatesModel.createPaymentState(newPaymentState, (err, paymentState) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating the payment state' });
    }
    res.json({ message: 'Payment State added successfully', paymentState });
  });
};

// Update a payment state by its ID
exports.updatePaymentState = (req, res) => {
  const id = req.params.id;
  const updatedPaymentState = req.body;
  PaymentStatesModel.updatePaymentState(id, updatedPaymentState, (err, paymentState) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating the payment state' });
    }
    res.json({ message: 'Payment State updated successfully', paymentState });
  });
};

// Delete a payment state by its ID
exports.deletePaymentState = (req, res) => {
  const id = req.params.id;
  PaymentStatesModel.deletePaymentState(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting the payment state' });
    }
    res.json({ message: 'Payment State deleted successfully', result });
  });
};
