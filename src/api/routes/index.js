import express from "express";
import classesRouter from './classes.js';

const router = express.Router()

router.use('/classes', classesRouter);

export default router