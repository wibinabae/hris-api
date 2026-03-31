const pool = require("../config/db");

const EmployeeRepository = {
  getAll: async (limit, offset) => {
    const result = await pool.query(
      "SELECT * FROM employees ORDER BY id ASC LIMIT $1 OFFSET $2",
      [limit, offset],
    );

    const totalResult = await pool.query("SELECT COUNT(*) FROM employees");
    const total = parseInt(totalResult.rows[0].count);

    return {
      total,
      data: result.rows,
    };
  },

  countAll: async () => {
    const result = await pool.query("SELECT COUNT(*) FROM employees");
    return parseInt(result.rows[0].count);
  },

  getById: async (id) => {
    const result = await pool.query("SELECT * FROM employees WHERE id=$1", [
      id,
    ]);
    return result.rows[0];
  },

  getByKeyword: async (keyword, limit = 10, offset = 0) => {
    const search = `%${keyword}%`;
    const result = await pool.query(
      `SELECT * FROM employees 
     WHERE employee_id ILIKE $1 OR full_name ILIKE $1
     ORDER BY id ASC LIMIT $2 OFFSET $3`,
      [search, limit, offset],
    );

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM employees WHERE employee_id ILIKE $1 OR full_name ILIKE $1`,
      [search],
    );
    const total = parseInt(countResult.rows[0].count);

    return { total, data: result.rows };
  },

  create: async (data) => {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO employees (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  update: async (id, data = {}) => {
    
    if (!data || typeof data !== "object") {
      throw new Error("No data provided for update");
    }

    data.updated_at = new Date();
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error("No fields to update");
    }
    const setString = keys.map((key, idx) => `${key}=$${idx + 1}`).join(", ");

    values.push(id);

    const query = `UPDATE employees SET ${setString} WHERE id=$${values.length} RETURNING *`;
    const result = await pool.query(query, values);

    if (!result.rows[0]) {
      throw new Error("Employee not found");
    }

    return result.rows[0];
  },

  delete: async (id) => {
    await pool.query("DELETE FROM employees WHERE id=$1", [id]);
    return { message: "Employee deleted" };
  },
};

module.exports = EmployeeRepository;
