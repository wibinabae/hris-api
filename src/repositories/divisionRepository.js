const pool = require('../config/db');
const { create } = require('./employeeRepository');
const DivisionRepository = {
    getAllDivision: async () => {
        const result = await pool.query("SELECT id, name FROM divisions WHERE parent_id IS NULL");
        return result.rows
    },

    getAllUnit: async () => {
        const result = await pool.query("SELECT u.id, u.name as unit, d.name as division from divisions u LEFT JOIN divisions d ON d.id = u.parent_id WHERE u.parent_id IS NOT NULL");
        return result.rows
    },

    getById: async (id) => {
        const result = await pool.query("SELECT id, name FROM divisions WHERE parent_id IS NULL AND id =$1",
            [id]
        )
        return result.rows[0]
    },

    create: async ({ name }) => {
        const result = await pool.query(
            `INSERT INTO divisions (name) VALUES ($1) RETURNING id, name`,
            [name]
        );
        return result.rows[0]
    },

    update: async (id, name) => {
        const result = await pool.query('UPDATE divisions SET nama =$id WHERE id=$2',
            [name, id]
        );
        return result.rows[0]
    },

    delete: async (id) => {
        await pool.query('DELETE FROM divisions WHERE id=$1', [id])
        return { message: 'Division deleted' }
    }
}

module.exports = DivisionRepository