const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./models/mongoDB');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/sales', require('./routes/sales.route'));
app.use('/api/expenses', require('./routes/expense.route'));
app.use('/api/inventory', require('./routes/inventory.route'));

// Default Route
app.get('/', (req, res) => {
    res.send('BakeBox Backend is running!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
