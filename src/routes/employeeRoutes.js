const express = require("express");
const router = express.Router();
const EmployeeController = require("../controllers/employeeController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware);

router.get(
  "/",
  roleMiddleware(["admin", "hr"]),
  EmployeeController.getAllEmployees,
);
router.get(
  "/:id",
  roleMiddleware(["employee"]),
  EmployeeController.getEmployeeById,
);

router.get("/search/:keyword", EmployeeController.getEmployeeByKeyword);

router.post("/", EmployeeController.createEmployee);
router.put("/:id", EmployeeController.updateEmployee);
router.delete("/:id", EmployeeController.deleteEmployee);

module.exports = router;
