const Sale = require('../models/sales.models');

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
