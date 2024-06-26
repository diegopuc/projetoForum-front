import axios, { type AxiosInstance } from 'axios';

 //const baseURL = 'http://localhost:3000/api';
const baseURL = 'https://main.d2i6b28dl6mncp.amplifyapp.com/api';

//+

const api: AxiosInstance = axios.create({
  baseURL,
  //withCredentials: true, // para enviar cookies e credenciais
});

export default api;
