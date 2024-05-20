import {createRouter, createWebHistory} from 'vue-router'

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import AdminDashboard from '../components/admin/Dashboard.vue';
import UserDashboard from '../components/User/UserDashboard.vue';
import WaitingApproval from '../components/WaitingApproval.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/adminDashboard', component: AdminDashboard },
    { path: '/userDashboard', component: UserDashboard },
    { path: '/waitingapproval', name: 'WaitingApproval', component: WaitingApproval, props: true,},
  ]
})

export default router
