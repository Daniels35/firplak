const express = require('express');
const router = express.Router();
const inventoriesController = require('../../controllers/inventories/inventoriesController');

router.put('/inventories/moveProductsToPto1/:id', inventoriesController.moveProductsToPto1);

module.exports = router;
