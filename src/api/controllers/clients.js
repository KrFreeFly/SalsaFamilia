import { Clients } from '../models/index.js';
import HttpError from '../errors/httpError.js';

export const createNewClient = async ({ name, surname, cellphone, vk, insta, info, birthday }) => {
  const result = await Clients.create({
    name,
    surname,
    cellphone,
    vk,
    insta,
    info,
    birthday,
  });

  return result.get({ plain: true });
};

//GET
export const getAllClients = async (req, res) => {
  const { rows, count } = await Clients.findAndCountAll({
    where: {
      removedAt: null,
    },
    order: [
      ['surname', 'ASC'],
      ['name', 'ASC'],
    ],
  });
  const items = rows.map((u) => u.get());
  if (items.length === 0) {
    throw new HttpError(404, 'Clients not found, create at least one!');
  }
  const result = {
    items,
    total: count,
  };
  res.status(200).json(result);
};

export const getOneClient = async ({ clientId }) => {
  const client = Clients.findOne({
    where: {
      id: clientId,
    },
  });
  if (!client) {
    throw new HttpError(404, 'Client not found');
  }
  return client;
};

//PUT
export const updateClient = async ({ clientId, clientData }) => {
  const client = Clients.update(clientData, {
    where: {
      id: clientId,
    },
  });
  return client;
};

//DELETE
export const deleteClient = async ({ clientId }) => {
  const client = Clients.update({ removedAt: new Date() }, { where: { id: clientId } });
  return client;
};
