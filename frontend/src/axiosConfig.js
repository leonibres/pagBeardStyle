import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(request => {
    console.log('Enviando petición:', request);
    return request;
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('Error de conexión:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;