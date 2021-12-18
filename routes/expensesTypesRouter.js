const express = require("express");
const {getExpenseTypes, createExpenseType, deleteExpenseType, updateExpenseType} = require("../controllers/expensesTypesController");
const router = express.Router();

router.route('/')
    .get(getExpenseTypes)
    .post(createExpenseType);

router.route('/:idExpensesType')
    .put(updateExpenseType)
    .delete(deleteExpenseType);

module.exports = router;