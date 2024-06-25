import axios, { type AxiosInstance } from 'axios';

 //const baseURL = 'http://localhost:3000/api';
const baseURL = 'http://projetoforum-back.onrender.com/api';

//+

const api: AxiosInstance = axios.create({
  baseURL,
  //withCredentials: true, // para enviar cookies e credenciais
});

export default api;
