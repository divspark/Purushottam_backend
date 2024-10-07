const sql = require('mssql');
const { MongoClient } = require('mongodb');

// SQL Server configuration
const sqlConfig = {
    user: 'sa', // Username
    password: 'Test@Sql@3(*)', // Password
    server: '13.234.117.179', // Server IP address
    port: 1433, // Port
    database: 'BizSol', // Database name
    options: {
        encrypt: true, // Use this if you're on Windows Azure
        trustServerCertificate: true, // Use this to skip SSL certificate validation (for local dev/testing)
    },
};

// MongoDB configuration
const mongoUri = 'mongodb+srv://divyansh2004mhj:Xs0gIemQnqnhdhpT@food-miles.5ivi1wn.mongodb.net/Customer2?retryWrites=true&w=majority&appName=Food-Miles'; 
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
