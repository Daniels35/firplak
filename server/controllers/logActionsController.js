const LogActionsModel = require('../models/logActionsModel');

// Log a new action
exports.logAction = (req, res) => {
  // Obtiene los datos de la acción que deseas registrar desde req.body o req.params según sea necesario
  const { user_id, affected_table, action_type, affected_record_id } = req.body;

  // Crea un objeto que representa la nueva acción a registrar
  const newAction = {
    user_id,
    affected_table,
    action_type,
    affected_record_id,
  };

  // Registra la acción en la tabla log_actions
  LogActionsModel.createAction(newAction, (err, action) => {
    if (err) {
      return res.status(500).json({ error: 'Error registering the action' });
    }

    res.json({ message: 'Action registered successfully', action });
  });
};

// Obtener y mostrar todos los registros de log_actions
exports.viewLogs = (req, res) => {
  LogActionsModel.getAllLogs((err, logs) => {
    if (err) {
      return res.status(500).json({ error: 'Error retrieving log records' });
    }

    res.json( logs );
  });
};
