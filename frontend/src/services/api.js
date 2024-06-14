import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quizapp-backend-532h.onrender.com'
});

export default api;