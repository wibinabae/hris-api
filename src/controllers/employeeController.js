const EmployeeService = require("../services/employeeService");
const { successResponse, errorResponse } = require("../utils/response");

const EmployeeController = {
  getAllEmployees: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const { data, total } = await EmployeeService.getAllEmployees(
        page,
        limit,
      );
      const totalPages = Math.ceil(total / limit);
      const meta = {
        total,
        page,
        limit,
        total_pages: totalPages,
      };
      return successResponse(res, 'Success get employess', data, 200, meta)
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      const employee = await EmployeeService.getEmployeeById(req.params.id);
      return successResponse(res, "Succes get employee", employee);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },

  getEmployeeByKeyword: async (req, res) => {
    try {
      const employee = await EmployeeService.getEmployeeByKeyword(
        req.params.keyword,
      );
      res.json(employee);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },

  createEmployee: async (req, res) => {
    try {
      const newEmployee = await EmployeeService.createEmployee(req.body);
      return successResponse(
        res,
        "Employee created successfully",
        newEmployee,
        201,
      );
    } catch (err) {
      return errorResponse(res, err.message, 400);
    }
  },

  updateEmployee: async (req, res) => {
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(
        req.params.id,
        req.body,
      );
      return successResponse(
        res,
        "Employee updated successfully",
        updatedEmployee,
      );
    } catch (err) {
      return errorResponse(res, err.message, 400);
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      const result = await EmployeeService.deleteEmployee(req.params.id);
      res.json(result);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },
};

module.exports = EmployeeController;
