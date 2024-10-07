const sql = require('mssql');
require('dotenv').config();
const { MongoClient } = require('mongodb');

// SQL Server configuration
const sqlConfig = {
    user: process.env.SQL_USER, 
    password: process.env.SQL_PASSWORD, // Password
    server: process.env.SQL_SERVER, // Server IP address
    port: 1433, // Port
    database: process.env.SQL_DATABASE, // Database name
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true, // Use this to skip SSL certificate validation (for local dev/testing)
    },
};

// MongoDB configuration
const mongoUri = process.env.MONGO_URI; 
const mongoClient = new MongoClient(mongoUri);
let mongoDb; // Global variable to store the database reference

// Function to connect to MongoDB and SQL Server
const connectDatabases = async () => {
    try {
        // Connect to MongoDB
        await mongoClient.connect();
        mongoDb = mongoClient.db('Customer2'); // Store the database reference
        console.log('Connected to MongoDB');

        // Connect to SQL Server
        await sql.connect(sqlConfig);
        console.log('Connected to SQL Server');
    } catch (err) {
        console.error('Database connection failed: ', err);
    }
};

// Function to execute SQL queries
const executeSqlQuery = async (query) => {
    try {
        const result = await sql.query(query);
        return result.recordset; // Return the records
    } catch (err) {
        console.error('Error executing SQL query: ', err);
        throw err; // Rethrow error to be handled by the calling function
    }
};

// Export the modules
module.exports = {
    connectDatabases,
    getMongoDb: () => mongoDb, // Function to get the MongoDB reference
    executeSqlQuery, // Export SQL query execution function
    sql, // Export SQL instance for further use
};
