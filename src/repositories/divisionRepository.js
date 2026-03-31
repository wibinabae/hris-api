const pool = require('../config/db')
const DivisionRepository={
    getAllDivision: async()=>{
        const result = await pool.query("SELECT id, name FROM divisions WHERE parent_id IS NULL");
        return result.rows
    },

    getAllUnit: async()=>{
         const result = await pool.query("SELECT u.id, u.name as unit, d.name as division from divisions u LEFT JOIN divisions d ON d.id = u.parent_id WHERE u.parent_id IS NOT NULL");
        return result.rows
    }
}

module.exports = DivisionRepository