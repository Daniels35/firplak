const PaymentMethodsModel = require('../models/paymentMethodsModel');

// Get all payment methods
exports.getAllPaymentMethods = (req, res) => {
  PaymentMethodsModel.getAll((err, paymentMethods) => {
    if (err) {
      return res.status(500).json({ error: 'Error getting payment methods' });
    }
    res.json(paymentMethods);
  });
};

// Get a payment method by its ID
exports.getPaymentMethodById = (req, res) => {
  const id = req.params.id;
  PaymentMethodsModel.getPaymentMethodById(id, (err, paymentMethod) => {
    if (err) {
      return res.status(500).json({ error: 'Error getting the payment method' });
    }
    res.json(paymentMethod);
  });
};

// Create a new payment method
exports.createPaymentMethod = (req, res) => {
  const newPaymentMethod = req.body;
  
  if (!newPaymentMethod.name_payment) {
    return res.status(400).json({ error: 'Payment Method Name is required' });
  }
  
  PaymentMethodsModel.createPaymentMethod(newPaymentMethod, (err, paymentMethod) => {
    if (err) {
      return res.status(500).json({ error: 'Error creating the payment method' });
    }
    res.json({ message: 'Payment Method added successfully', paymentMethod });
  });
};

// Update a payment method by its ID
exports.updatePaymentMethod = (req, res) => {
  const id = req.params.id;
  const updatedPaymentMethod = req.body;
  PaymentMethodsModel.updatePaymentMethod(id, updatedPaymentMethod, (err, paymentMethod) => {
    if (err) {
      return res.status(500).json({ error: 'Error updating the payment method' });
    }
    res.json({ message: 'Payment Method updated successfully', paymentMethod });
  });
};

// Delete a payment method by its ID
exports.deletePaymentMethod = (req, res) => {
  const id = req.params.id;
  PaymentMethodsModel.deletePaymentMethod(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting the payment method' });
    }
    res.json({ message: 'Payment Method deleted successfully', result });
  });
};
