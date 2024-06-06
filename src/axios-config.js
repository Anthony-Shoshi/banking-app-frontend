import axios from 'axios';

// Configure Base URL and other defaults
axios.defaults.baseURL = 'http://localhost:8080';

// Add interceptors
axios.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    console.error('Response Error:', error);
    return Promise.reject(error);
});

export default axios;
