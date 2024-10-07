
const { sql } = require('../config/db'); 

const getProductionData = async () => {
    try {
        const query = `
            SELECT TOP 10
                pm.Code AS ProcessCode,
                pm.ProcessName,
                pm.AliasName,
                pm.FinYear,
                pm.DatabaseLocation_Code AS ProcessDatabaseLocation,
                pm.ProcessTypeMaster_Code,
                pm.IsApplicableInForgingProduction,
                pm.IsIssueReceivedApplicable,
                pm.IsMasterProcess,
                pm.ProcessGroup,
                pm.StockType,
                pm.AutoMailForDailyProductionReport,
                prod.WeightLoss,
                prod.UserID,
                prod.ProductionDate,            -- New column from ProductionMaster
                prod.ShiftMaster_Code,          -- New column from ProductionMaster
                prod.RunningTime,               -- New column from ProductionMaster
                prod.MachineMaster_Code,        -- New column from ProductionMaster
                prod.BreakDownTime,             -- New column from ProductionMaster
                prod.FinYear,                   -- New column from ProductionMaster
                prod.QualityIncharge,           -- New column from ProductionMaster
                prod.GRNo             
            FROM 
                ProcessMaster pm
            JOIN 
                PvcProductionMaster prod 
                ON pm.Code = prod.ProcessMaster_Code;
        `;

        const result = await sql.query(query);
        return result.recordset; // Return the records
    } catch (error) {
        console.error('Error fetching production data: ', error);
        throw error; // Rethrow error to be handled by the calling function
    }
};

module.exports = {
    getProductionData,
};



// // // Retrieve all employees from MongoDB
// // const getMongoEmployees = async () => {
// //     try {
// //         const db = getMongoDb(); // Get the MongoDB reference
// //         const employees = await db.collection('employees').find().toArray();
// //         return employees;
// //     } catch (error) {
// //         console.error('Error fetching MongoDB employees: ', error);
// //         throw error; 
// //     }
// // };

// // // Combine SQL and MongoDB employees
// // exports.getAllEmployees = async (req, res) => {
// //     try {
// //         const sqlEmployees = await getSqlEmployees();
// //         const mongoEmployees = await getMongoEmployees();
// //         const combined = { sqlEmployees, mongoEmployees };
// //         res.json(combined);
// //     } catch (error) {
// //         console.error('Error fetching employees: ', error);
// //         res.status(500).json({ message: 'Error fetching employees' });
// //     }
// // };


