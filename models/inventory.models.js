const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productName: { type: String, required: true },
    stock: { type: Number, required: true },
    costPrice: { type: Number, required: true },
});

module.exports = mongoose.model('Inventory', inventorySchema);
