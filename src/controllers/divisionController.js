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
};

module.exports = DivisionController