import express from 'express';
import classesRouter from './classes.js';
import clientsRouter from './clients.js';
import passesRouter from './passes.js';
import passTypesRouter from './passTypes.js';

const router = express.Router();

router.use('/classes', classesRouter);
router.use('/clients', clientsRouter);
router.use('/passes', passesRouter);
router.use('/passTypes', passTypesRouter);

export default router;
