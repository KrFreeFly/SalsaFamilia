import axios from 'axios';

const host = 'http://localhost:5000/api/v1';

export const instance = axios.create({
  baseURL: host,
  timeout: 10000,
});
