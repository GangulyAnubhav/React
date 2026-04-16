import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

export const testDbConnection = async () => {
    try {
        const connection = await db.getConnection();
        console.log("Database connection successful");
        connection.release();
    } catch (error) {
        console.error("Database connection failed:", error);
    }     
};

export default db;