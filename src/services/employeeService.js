const EmployeeRepository = require("../repositories/employeeRepository");

const EmployeeService = {
  getAllEmployees: async (page, limit) => {
    const offset = (page - 1) * limit;
    const data = await EmployeeRepository.getAll(limit, offset);
    const total = await EmployeeRepository.countAll();
    return { data, total };
  },

  getEmployeeById: async (id) => {
    const employee = await EmployeeRepository.getById(id);
    if (!employee) throw new Error("Employee Not Found");
    return employee;
  },

  getEmployeeByKeyword: async (keyword) => {
    const employee = await EmployeeRepository.getByKeyword(keyword);
    if (!employee) throw new Error("Employee Not Found");
    return employee;
  },

  createEmployee: async (data) => {
    if (!data.employee_id || !data.full_name) {
      throw new Error("employee_id and full_name are required");
    }
    return await EmployeeRepository.create(data);
  },

  updateEmployee: async (id, data) => {
    const employee = await EmployeeRepository.getById(id);
    if (!employee) throw new Error("Employee not found");
    return await EmployeeRepository.update(id, data);
  },

  deleteEmployee: async (id) => {
    const employee = await EmployeeRepository.getById(id);
    if (!employee) throw new Error("Employee not found");
    return await EmployeeRepository.delete(id);
  },
};

module.exports = EmployeeService;
