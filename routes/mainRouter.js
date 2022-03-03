import express from "express";

const router = express.Router()

import homeRouter from '../routes/homeRouter.js'
import authRouter from '../routes/authRouter.js'
import clientRouter from '../routes/clientRouter.js'
import passesRouter from '../routes/passesRouter.js'
import passTypesRouter from './passTypesRouter.js'
import classesRouter from '../routes/classesRouter.js'
import expensesRouter from './expensesRouter.js'
import projectsRouter from '../routes/projectsRouter.js'
import analyticsRouter from '../routes/analyticsRouter.js'
 
//Define routes
router.use('/', homeRouter);
//router.use('/', authRouter);
router.use('/passtypes', passTypesRouter);
router.use('/classes', classesRouter);
router.use('/expenses', expensesRouter);
router.use('/projects', projectsRouter);
router.use('/passes', passesRouter);
router.use('/clients', clientRouter);
router.use('/analytics', analyticsRouter);

export default router