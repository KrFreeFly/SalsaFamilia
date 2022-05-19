import express from "express";
import classesRouter from './classes.js';
import clientsRouter from './clients.js';

const router = express.Router()

router.use('/classes', classesRouter);
router.use('/clients', clientsRouter);

export default router