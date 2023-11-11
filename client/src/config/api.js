import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.proyectologistica.online',
});

export default api;
