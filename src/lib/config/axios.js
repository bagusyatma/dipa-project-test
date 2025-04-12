import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json';

  return config;
});
