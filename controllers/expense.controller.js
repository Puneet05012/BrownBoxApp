const Expense = require('../models/expense.models');

// Add an Expense
exports.addExpense = async (req, res) => {
    try {
        const { category, amount, description } = req.body;
        const expense = new Expense({ category, amount, description });
        await expense.save();
        res.status(201).json({ message: 'Expense added successfully', expense });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add expense', error });
    }
};

// Get Expense Report
exports.getExpensesReport = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get expense report', error });
    }
};
