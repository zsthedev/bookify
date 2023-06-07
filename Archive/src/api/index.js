/**
 * This file is configuration for axios.
 * Default headers are configured as well
 * as common headers in this file
 */
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const axiosClient = axios.create(); // creating axios instance

axiosClient.defaults.baseURL = BASE_URL;
axiosClient.defaults.headers.post['Content-Type'] = 'application/json';
axiosClient.defaults.headers.post['Access-Control-Allow-Headers'] = '*';
axiosClient.defaults.withCredentials = 'true';

// adding request & response interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
