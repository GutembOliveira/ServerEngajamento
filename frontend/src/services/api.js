import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quizapp-backend-532h.onrender.com'
  //baseURL: 'http://192.168.0.105:5000'
  //baseURL: 'https://quiz-app-new-backend.onrender.com'
  //baseURL: process.env.EXPO_PUBLIC_URL_API
});

export default api;