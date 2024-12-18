const express = require('express');
const { addSale, getSalesReport } = require('../controllers/sales.controller');
const router = express.Router();

// Route to Add a Sale
router.post('/add', addSale);

// Route to Get Sales Report
router.get('/report', getSalesReport);

module.exports = router;
