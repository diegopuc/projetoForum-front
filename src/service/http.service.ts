import axios, { type AxiosInstance } from 'axios';

//const baseURL = 'http://localhost:3000/api';
const baseURL = 'https://main.d2stv5kwgtxo8r.amplifyapp.com/api';

const api: AxiosInstance = axios.create({
  baseURL,
});

export default api;
