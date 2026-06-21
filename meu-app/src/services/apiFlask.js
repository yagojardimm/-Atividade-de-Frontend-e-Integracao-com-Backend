import axios from 'axios';

const apiFlask = axios.create({
  baseURL: import.meta.env.VITE_API_FLASK_URL || '/api-flask',
});

// Interceptor para adicionar o token JWT nas requisições do Flask
apiFlask.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiFlask;
