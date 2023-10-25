const db = require('../config/database');

const LogActionsModel = {};

// Create the log_actions table if it doesn't exist
db.query(`
    CREATE TABLE IF NOT EXISTS log_actions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT 0,
    affected_table VARCHAR(255) NOT NULL,
    action_type VARCHAR(255) NOT NULL,
    affected_record_id INT,
    action_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`, (err) => {
  if (err) {
    console.error('Error creating the log_actions table: ' + err);
  } else {
    console.log('The log_actions table was created successfully.');
  }
});

// Register a new action
LogActionsModel.createAction = (newAction, callback) => {
  db.query('INSERT INTO log_actions SET ?', newAction, (err, result) => {
    if (err) {
      return callback(err, null);
    }
    newAction.id = result.insertId;
    callback(null, newAction);
  });
};

// Obtener todos los registros de log_actions
LogActionsModel.getAllLogs = (callback) => {
    db.query('SELECT * FROM log_actions', (err, rows) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, rows);
    });
  };

module.exports = LogActionsModel;
