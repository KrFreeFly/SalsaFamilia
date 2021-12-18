const express = require("express");
const {getExpenses, createExpense, updateExpense, deleteExpense} = require("../controllers/expensesController");
const expensesTypesRouter = require('./expensesTypesRouter');
const router = express.Router();

router.use('/types', expensesTypesRouter);

router.route('/')
    .get(getExpenses)
    .post(createExpense)

router.route('/:idExpenses')
    .put(updateExpense)
    .delete(deleteExpense)

module.exports = router;