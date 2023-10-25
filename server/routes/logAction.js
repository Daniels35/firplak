const express = require('express');
const router = express.Router();
const logActionsController = require('../controllers/logActionsController'); 

// Ruta para registrar una acción en el registro de auditoría
router.post('/logs', logActionsController.logAction);

router.get('/logs', logActionsController.viewLogs);

module.exports = router;
