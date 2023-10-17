const express = require('express');
const router = express.Router();
const inventoriesPto1Controller = require('../../controllers/inventories/inventoriesPto1Controller');

// Route to get all inventory records in Pto1
router.get('/inventories-pto1', inventoriesPto1Controller.getAllInventoriesPto1);

// Route to get an inventory record in Pto1 by its ID
router.get('/inventories-pto1/:id', inventoriesPto1Controller.getInventoryPto1ById);

// Route to create a new inventory record in Pto1
router.post('/inventories-pto1', inventoriesPto1Controller.createInventoryPto1);

// Route to update an inventory record in Pto1 by its ID
router.put('/inventories-pto1/:id', inventoriesPto1Controller.updateInventoryPto1);

// Route to delete an inventory record in Pto1 by its ID
router.delete('/inventories-pto1/:id', inventoriesPto1Controller.deleteInventoryPto1);

module.exports = router;
