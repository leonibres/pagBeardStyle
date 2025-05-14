// filepath: e:\vue\proyecto-beardStyleWeb\frontend\src\axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Cambia esto si el backend usa otra URL o puerto
});

export default axiosInstance;