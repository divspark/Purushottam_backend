// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const { getProductionData } = require('../controllers/controllers');


router.get('/production', async (req, res) => {
    try {
        const productionData = await getProductionData();
        res.json(productionData); // Send the production data as JSON response
    } catch (error) {
        console.error('Error fetching production data: ', error);
        res.status(500).json({ message: 'Error fetching production data' });
    }
});

module.exports = router;
