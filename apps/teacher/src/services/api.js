import axios from 'axios';

const api = axios.create({
  baseURL: 'https://serverengajamento.onrender.com'
});

export default api;