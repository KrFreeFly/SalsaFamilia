import express from 'express';
import {
    getPasses,
    createPass,
    editPass,
    getPass,
    newPass,
    deletePass
} from '../controllers/passesController.js';

const router = express.Router();

router.route('/')
    .get(getPasses)
    .post(createPass)

router.route('/newpass')
    .get(newPass)

router.route('/:idPasses')
    .get(getPass)
    .put(editPass)
    .delete(deletePass)

export default router;