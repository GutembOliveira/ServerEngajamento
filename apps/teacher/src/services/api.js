import axios from 'axios';

const api = axios.create({
  baseURL: 'https://serverengajamento.onrender.com',
  headers: { "Content-Type": "application/json" }
});

export default api;