const express = require('express');
const router = express.Router();
const DivisionController = require('../controllers/divisionController');
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

router.use(authMiddleware)

router.get('/', DivisionController.getAllDivision);
router.get('/units', DivisionController.getAllUnit);
router.get('/:id', DivisionController.getDivisionById);
router.post('/', DivisionController.createDivision);
router.put('/:id', DivisionController.updateDivision);
router.delete('/:id', DivisionController.deleteDivision);

module.exports = router