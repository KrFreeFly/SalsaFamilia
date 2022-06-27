import { instance } from '../axios.js';

export const getAllClients = async () => {
  try {
    console.log('here');
    const { data } = instance.get('/clients');
    return data;
  } catch (e) {
    return e;
  }
};
