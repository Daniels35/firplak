const express = require('express');
const router = express.Router();
const inventoriesPto2Controller = require('../../controllers/inventories/inventoriesPto2Controller');

// Route to get all inventory records in Pto2
router.get('/inventories-pto2', inventoriesPto2Controller.getAllInventoriesPto2);

// Route to get an inventory record in Pto2 by its ID
router.get('/inventories-pto2/:id', inventoriesPto2Controller.getInventoryPto2ById);

// Route to create a new inventory record in Pto2
router.post('/inventories-pto2', inventoriesPto2Controller.createInventoryPto2);

// Route to update an inventory record in Pto2 by its ID
router.put('/inventories-pto2/:id', inventoriesPto2Controller.updateInventoryPto2);

// Route to delete an inventory record in Pto2 by its ID
router.delete('/inventories-pto2/:id', inventoriesPto2Controller.deleteInventoryPto2);

module.exports = router;
