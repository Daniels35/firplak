const express = require('express');
const router = express.Router();
const colorsController = require('../controllers/colorsController');

// Route to get all colors
router.get('/colors', colorsController.getAllColors);

// Route to get a color by its ID
router.get('/colors/:id', colorsController.getColorById);

// Route to create a new color
router.post('/colors', colorsController.createColor);

// Route to update a color by its ID
router.put('/colors/:id', colorsController.updateColor);

// Route to delete a color by its ID
router.delete('/colors/:id', colorsController.deleteColor);

module.exports = router;
