import express from 'express';
import { getClassesPage } from "../controllers/classesController.js";

const router = express.Router();

router.route('/')
    .get(getClassesPage)

export default router