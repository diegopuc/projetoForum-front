import axios, { type AxiosInstance } from 'axios';

// const baseURL = 'http://localhost:3001/api';
const baseURL = 'https://260f173a-3ef8-4266-a3a1-ad410cb48959-00-24sfx6b5ruxkc.spock.replit.dev/api';

const api: AxiosInstance = axios.create({
  baseURL,
});

export default api;
