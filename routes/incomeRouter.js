const express = require("express");
const incomeController = require("../controllers/incomeController");
const incomeRouter = express.Router();

incomeRouter.use('/types/create', incomeController.createIncomeType);
incomeRouter.get('/types', incomeController.getIncomeTypes);
incomeRouter.use('/create', incomeController.createIncome);
incomeRouter.get("/", incomeController.getIncome);

module.exports = incomeRouter;