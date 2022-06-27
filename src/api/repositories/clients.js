import { Clients } from '../models/clients';

export const insertOne = async ({ name, surname, cellphone, vk, insta, info, birthday }) => {
  const client = Clients.create({ name, surname, cellphone, vk, insta, info, birthday });
  console.log(client);
  return client;
};
