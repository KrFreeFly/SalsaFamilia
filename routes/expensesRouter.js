import express from 'express';
import {
    createExpense,
    deleteExpense,
    getExpenses,
    updateExpense
} from '../controllers/expensesController.js';

import expensesTypesRouter from "./expensesTypesRouter.js";

const router = express.Router();

router.use('/types', expensesTypesRouter);

router.route('/')
    .get(getExpenses)
    .post(createExpense)

router.route('/:idExpenses')
    .put(updateExpense)
    .delete(deleteExpense)

export default router