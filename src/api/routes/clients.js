import express from 'express';
const router = express.Router();
import {
    getAllClients,
    createNewClient,
    deleteClient,
    updateClient
} from '../controllers/clients.js';

router.route('/')
    .get(getAllClients)
    .post(createNewClient)

router.route('/:clientId')
    .put(updateClient)
    .delete(deleteClient)

export default router

