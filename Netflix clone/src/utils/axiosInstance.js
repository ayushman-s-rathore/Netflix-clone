import axios from 'axios';
import { API_END_POINT } from './constant';

// Create axios instance with default configuration for CORS and credentials
const axiosInstance = axios.create({
  baseURL: API_END_POINT,
  withCredentials: true, // Always send credentials (cookies) with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

