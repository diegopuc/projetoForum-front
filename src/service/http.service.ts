import axios, { type AxiosInstance } from 'axios';

 //const baseURL = 'http://localhost:3000/api';
const baseURL = 'main.d2zml6m6uc2eec.amplifyapp.com/api';

const api: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true, // para enviar cookies e credenciais
});

export default api;
