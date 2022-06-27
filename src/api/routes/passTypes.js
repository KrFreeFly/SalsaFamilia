import express from 'express';
const router = express.Router();
import {
  getAllPassTypes,
  getOnePassType,
  createPassType,
  updatePassType,
  deletePassType,
} from '../controllers/passTypes.js';

// POST

router.post('/', async (req, res, next) => {
  try {
    const { type, amount, week, month, cost } = req.body;

    const passType = await createPassType({ type, amount, week, month, cost });
    res.status(200).json(passType);
  } catch (error) {
    return next(error);
  }
});

// GET

router.get('/', async (req, res, next) => {
  try {
    const passTypes = await getAllPassTypes();
    res.status(200).json(passTypes);
  } catch (error) {
    return next(error);
  }
});

export default router;
