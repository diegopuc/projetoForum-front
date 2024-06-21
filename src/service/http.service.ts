import axios, { type AxiosInstance } from 'axios';

// const baseURL = 'http://localhost:3001/api';
const baseURL = 'https://main.d1sq507er5tgkn.amplifyapp.com/api';

const api: AxiosInstance = axios.create({
  baseURL,
});

export default api;
