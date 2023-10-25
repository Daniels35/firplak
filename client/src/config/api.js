import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3027',
});

export default api;
