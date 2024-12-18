const express = require('express');
const { 
    addSale, 
    getSalesReport,
    getProfitLossReport, 
    getTopSellingProducts, 
    getInvestmentRecovery  
} = require('../controllers/sales.controller');

const router = express.Router();

// Route to Add a Sale
router.post('/add', addSale);

// Route to Get Sales Report
router.get('/report', getSalesReport);

router.get('/profit-loss', getProfitLossReport); 
router.get('/top-products', getTopSellingProducts); 
router.get('/investment-recovery', getInvestmentRecovery);

module.exports = router;
