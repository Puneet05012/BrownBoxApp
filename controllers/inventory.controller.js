const Inventory = require('../models/inventory.models');

// Add New Inventory
exports.addInventory = async (req, res) => {
    try {
        const { productName, stock, costPrice } = req.body;
        const inventory = new Inventory({ productName, stock, costPrice });
        await inventory.save();
        res.status(201).json({ message: 'Inventory added successfully', inventory });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add inventory', error });
    }
};

// Update Inventory Stock
exports.updateInventory = async (req, res) => {
    try {
        const { id } = req.params;
        const { stock } = req.body;
        const inventory = await Inventory.findByIdAndUpdate(id, { stock }, { new: true });
        if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
        res.status(200).json({ message: 'Inventory updated successfully', inventory });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update inventory', error });
    }
};

// Get Inventory Status
exports.getInventoryStatus = async (req, res) => {
    try {
        const inventory = await Inventory.find();
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get inventory status', error });
    }
};
