import express from 'express';
import {
    getExpenseTypes,
    createExpenseType,
    deleteExpenseType,
    updateExpenseType
} from "../controllers/expensesTypesController.js";
const router = express.Router();

router.route('/')
    .get(getExpenseTypes)
    .post(createExpenseType);

router.route('/:idExpensesType')
    .put(updateExpenseType)
    .delete(deleteExpenseType);

export default router;