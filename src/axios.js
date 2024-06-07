import axios from 'axios';

// Create an Axios instance for your API
const api = axios.create({
    baseURL: 'http://localhost:8080/'
});

// Attach the interceptor to your custom Axios instance
api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    console.log("Auth Token:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Handle the error case
    return Promise.reject(error);
});

export default api;
