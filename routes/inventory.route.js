const express = require('express');
const { addInventory, updateInventory, getInventoryStatus } = require('../controllers/inventory.controller');
const router = express.Router();

// Route to Add New Inventory
router.post('/add', addInventory);

// Route to Update Inventory Stock
router.put('/update/:id', updateInventory);

// Route to Get Inventory Status
router.get('/status', getInventoryStatus);

module.exports = router;
