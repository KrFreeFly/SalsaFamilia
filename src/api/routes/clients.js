import express from 'express';

const router = express.Router();
import {
  getAllClients,
  getOneClient,
  createNewClient,
  deleteClient,
  updateClient,
} from '../controllers/clients.js';

// POST

router.post('/', async (req, res, next) => {
  try {
    const { name, surname, cellphone, vk, insta, info, birthday } = req.body;

    const result = await createNewClient({ name, surname, cellphone, vk, insta, info, birthday });
    res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

// GET

router.get('/:clientId', async (req, res, next) => {
  try {
    const clientId = req.params.clientId;

    const client = await getOneClient({ clientId });
    res.status(200).json(client);
  } catch (error) {
    return next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const clients = await getAllClients();
    res.status(200).json(clients);
  } catch (error) {
    return next(error);
  }
});

// PUT

router.put('/:clientId', async (req, res, next) => {
  try {
    const clientId = req.params.clientId;
    const clientData = req.body;

    const client = await updateClient({ clientId, clientData });
    res.status(200).json(client);
  } catch (error) {
    return next(error);
  }
});

// DELETE

router.delete('/:clientId', async (req, res, next) => {
  try {
    const clientId = req.params.clientId;

    const client = await deleteClient({ clientId });
    res.status(200).json(client);
  } catch (error) {
    return next(error);
  }
});

export default router;
