const express = require('express');
const { addExpense, getExpensesReport } = require('../controllers/expense.controller');
const router = express.Router();

// Route to Add an Expense
router.post('/add', addExpense);

// Route to Get Expense Report
router.get('/report', getExpensesReport);

module.exports = router;
