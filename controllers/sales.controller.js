const Sale = require('../models/sales.models');
const Expense = require('../models/expense.models');

// Add a Sale
exports.addSale = async (req, res) => {
    try {
        const { productName, quantity, sellingPrice } = req.body;
        const sale = new Sale({ productName, quantity, sellingPrice });
        await sale.save();
        res.status(201).json({ message: 'Sale added successfully', sale });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add sale', error });
    }
};

// Get Sales Report
exports.getSalesReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query; // Optional date filters
        const filter = {};
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }
        const sales = await Sale.find(filter);
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get sales report', error });
    }
};

exports.getProfitLossReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Filter Sales
        const salesFilter = {};
        if (startDate || endDate) {
            salesFilter.date = {};
            if (startDate) salesFilter.date.$gte = new Date(startDate);
            if (endDate) salesFilter.date.$lte = new Date(endDate);
        }
        const sales = await Sale.find(salesFilter);

        // Filter Expenses
        const expensesFilter = {};
        if (startDate || endDate) {
            expensesFilter.date = {};
            if (startDate) expensesFilter.date.$gte = new Date(startDate);
            if (endDate) expensesFilter.date.$lte = new Date(endDate);
        }
        const expenses = await Expense.find(expensesFilter);

        // Calculate Totals
        const totalRevenue = sales.reduce((sum, sale) => sum + (sale.sellingPrice * sale.quantity), 0);
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        const profitOrLoss = totalRevenue - totalExpenses;

        res.status(200).json({
            totalRevenue,
            totalExpenses,
            profitOrLoss,
            message: profitOrLoss >= 0 ? 'Profit' : 'Loss'
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate profit/loss report', error });
    }
};

exports.getTopSellingProducts = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Filter Sales
        const filter = {};
        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }
        const sales = await Sale.find(filter);

        // Aggregate Product Sales
        const productSales = {};
        sales.forEach(({ productName, quantity }) => {
            productSales[productName] = (productSales[productName] || 0) + quantity;
        });

        // Sort by Quantity Sold
        const sortedProducts = Object.entries(productSales)
            .sort((a, b) => b[1] - a[1])
            .map(([productName, quantity]) => ({ productName, quantity }));

        res.status(200).json(sortedProducts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get top-selling products', error });
    }
};

exports.getInvestmentRecovery = async (req, res) => {
    try {
        const { initialInvestment } = req.query;

        // Calculate Total Revenue
        const sales = await Sale.find();
        const totalRevenue = sales.reduce((sum, sale) => sum + (sale.sellingPrice * sale.quantity), 0);

        // Calculate Recovery Percentage
        const recoveryPercentage = ((totalRevenue / initialInvestment) * 100).toFixed(2);

        res.status(200).json({
            totalRevenue,
            recoveryPercentage,
            message: `You have recovered ${recoveryPercentage}% of your initial investment.`
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to calculate investment recovery', error });
    }
};