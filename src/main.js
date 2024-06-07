import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import App from './App.vue'
import router from './router'
import store from './stores/User';


import './assets/main.css'

const app = createApp(App)


app.use(store);
app.use(createPinia())
app.use(router)

app.mount('#app')
