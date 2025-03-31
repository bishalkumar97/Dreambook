import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-backend-url.com/v1',
});

instance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('_t');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
