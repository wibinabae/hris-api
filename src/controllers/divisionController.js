const { update } = require("../repositories/employeeRepository");
const DivisionService = require("../services/divisionService");
const { successResponse, errorResponse } = require("../utils/response");

const DivisionController = {
  getAllDivision: async (req, res) => {
    try {
      const division = await DivisionService.getAllDivision();
      return successResponse(res, "Success get divisions", division);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },

  getAllUnit: async (req, res) => {
    try {
      const unit = await DivisionService.getAllUnit();
      return successResponse(res, "Success get units", unit);
    } catch (err) {
      return errorResponse(res, err.message);
    }
  },

  getDivisionById: async (req, res) => {
    try {
      const division = await DivisionService.getDivisionById(
        req.params.id
      );
      return successResponse(res, "Success get division", division, 200)
    } catch (err) {
      return errorResponse(res, err.message)
    }
  },

  createDivision: async (req, res) => {
    try {
      const name = req.body;
      const newDivision = await DivisionService.createDivision(name)
      return successResponse(res, 'Division created', newDivision)
    } catch (err) {
      return errorResponse(res, err.message)
    }
  },

  updateDivision: async (req, res) => {
    try {
      const updateDivision = await DivisionService.updateDivision(
        req.params.id, req.body.name
      );
      return successResponse(res, "Division updated", update)
    } catch (err) {
      return errorResponse(res, err.message)
    }
  },

  deleteDivision: async (req, res) => {
    try {
      const result = await DivisionService.deleteDivision(req.params.id);
      return successResponse(res, 'Division deleted', result)
    } catch (err) { return errorResponse(res, err.message); }
  }
};

module.exports = DivisionController