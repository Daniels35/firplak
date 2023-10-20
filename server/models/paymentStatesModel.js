const db = require('../config/database');

const PaymentStatesModel = {};

// Create the payment states table if it doesn't exist
db.query(`
  CREATE TABLE IF NOT EXISTS payment_states (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_state VARCHAR(255) NOT NULL
  )
`, (err) => {
  if (err) {
    console.error('Error creating the payment_states table: ' + err);
  } else {
    console.log('The payment_states table was created successfully.');
  }
});

// Get all payment states
PaymentStatesModel.getAll = (callback) => {
  db.query('SELECT * FROM payment_states', (err, paymentStates) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, paymentStates);
  });
};

// Get a payment state by its ID
PaymentStatesModel.getPaymentStateById = (id, callback) => {
  db.query('SELECT * FROM payment_states WHERE id = ?', [id], (err, paymentState) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, paymentState[0]);
  });
};

// Create a new payment state
PaymentStatesModel.createPaymentState = (newPaymentState, callback) => {
  db.query('INSERT INTO payment_states SET ?', newPaymentState, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    newPaymentState.id = result.insertId;
    callback(null, newPaymentState);
  });
};

// Update a payment state by its ID
PaymentStatesModel.updatePaymentState = (id, updatedPaymentState, callback) => {
  db.query('UPDATE payment_states SET ? WHERE id = ?', [updatedPaymentState, id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    updatedPaymentState.id = id;
    callback(null, updatedPaymentState);
  });
};

// Delete a payment state by its ID
PaymentStatesModel.deletePaymentState = (id, callback) => {
  db.query('DELETE FROM payment_states WHERE id = ?', [id], (err, result) => {
    if (err) {
      return callback(err, null);
    }
    callback(null, result.affectedRows);
  });
};

module.exports = PaymentStatesModel;
