import express from 'express';
const router = express.Router();
import {
  getAllPasses,
  getOnePass,
  createPass,
  updatePass,
  deletePass,
} from '../controllers/passes.js';

// POST

router.post('/', async (req, res, next) => {
  try {
    const { clientId, passTypeId, startDate, endDate, classesLeft, cost } = req.body;

    const pass = await createPass({ clientId, passTypeId, startDate, endDate, classesLeft, cost });
    res.status(200).json(pass);
  } catch (error) {
    return next(error);
  }
});

// GET

router.get('/', async (req, res, next) => {
  try {
    const passes = await getAllPasses();
    res.status(200).json(passes);
  } catch (error) {
    return next(error);
  }
});

export default router;
