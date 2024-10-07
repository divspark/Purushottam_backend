// app.js
const express = require('express');
const cors = require('cors');
const { connectDatabases } = require('./config/db');
const customerRoutes = require('./routes/routes.js');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to databases
connectDatabases();

// Routes
app.use('/api', customerRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
