import db from '../config/db.js';

const createUser = async (userData) => {
    const { FirstName, LastName, email, password } = userData;
    const [result] = await db.promise().execute(
        'INSERT INTO users (FirstName, LastName, email, password) VALUES (?, ?, ?, ?)',
        [FirstName, LastName, email, password]
    );
    return result;
};

const getUserByEmail = async (email) => {
    const [rows] = await db.promise().execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

export default {
    createUser,
    getUserByEmail
};