import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quizapp-backend-532h.onrender.com'
  //baseURL: 'http://192.168.0.105:5000'
});

export default api;