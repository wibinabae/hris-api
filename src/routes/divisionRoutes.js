const express = require('express');
const router = express.Router();
const DivisionController = require('../controllers/divisionController');
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware)

router.get('/divisions', DivisionController.getAllDivision);
router.get('/units', DivisionController.getAllUnit);

module.exports = router