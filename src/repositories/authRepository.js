const pool = require('../config/db')

const AuthRepository ={
    findByLogin: async(login)=>{
        const result = await pool.query(
            `SELECT u.*, e.full_name FROM users u
            LEFT JOIN employees e ON e.id = u.employee_id
            WHERE u.username = $1 OR u.username = $1`,
            [login]
        );
        return result.rows[0]
    },

    createUser: async({username, email, password, role, employee_id})=>{
        const result = await pool.query(
            `INSERT INTO users (username, email, password, role, employee_id)
            VALUES ($1, $2, $3,$4,$5)
            RETURNING id, username, email, role, employee_id`,
            [username, email, password, role, employee_id]
        );
        return result.rows[0];
    }
}

module.exports = AuthRepository