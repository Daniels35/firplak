const db = require('../config/database');

const PaymentMethodsModel = {};

// Create the payment methods table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS payment_methods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_payment VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the payment_methods table: ' + err);
  } else {
    console.log('The payment_methods table was created successfully.');
  }
});

// Get all payment methods
PaymentMethodsModel.getAll = (callback) => {
  db.query('SELECT * FROM payment_methods', (err, paymentMethods) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, paymentMethods);
  });
};

// Get a payment method by its ID
PaymentMethodsModel.getPaymentMethodById = (id, callback) => {
  db.query('SELECT * FROM payment_methods WHERE id = ?', [id], (err, paymentMethod) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, paymentMethod[0]);
  });
};

// Create a new payment method
PaymentMethodsModel.createPaymentMethod = (newPaymentMethod, callback) => {
  db.query('INSERT INTO payment_methods SET ?', newPaymentMethod, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    newPaymentMethod.id = result.insertId;
    callback(null, newPaymentMethod);
  });
};

// Update a payment method by its ID
PaymentMethodsModel.updatePaymentMethod = (id, updatedPaymentMethod, callback) => {
  db.query('UPDATE payment_methods SET ? WHERE id = ?', [updatedPaymentMethod, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedPaymentMethod.id = id;
    callback(null, updatedPaymentMethod);
  });
};

// Delete a payment method by its ID
PaymentMethodsModel.deletePaymentMethod = (id, callback) => {
  db.query('DELETE FROM payment_methods WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = PaymentMethodsModel;
