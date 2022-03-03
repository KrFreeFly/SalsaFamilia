import express from 'express';
const router = express.Router();
import {
    getAllClasses,
    createNewClass,
    deleteClass,
    updateClass
} from '../controllers/classes.js';

router.route('/')
    .get(getAllClasses)
    .post(createNewClass)

router.route('/:classId')
    .put(updateClass)
    .delete(deleteClass)

export default router

