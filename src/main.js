import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './stores/User';
import axios from 'axios';

// Set the default base URL for Axios
axios.defaults.baseURL = 'http://localhost:8080';
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Adding Axios interceptors
axios.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

axios.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
}, error => {
    // Always handle errors
    console.error('Response Error:', error);
    return Promise.reject(error);
});

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
