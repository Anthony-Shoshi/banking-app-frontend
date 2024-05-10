import {createRouter, createWebHistory} from 'vue-router'

import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import AdminLogin from '../components/Admin/Login.vue';
import Register from '../components/Register.vue';
import EmployeeRegister from '../components/Admin/Register.vue';
import WaitingApproval from '../components/WaitingApproval.vue';

import EmployeeView from '../components/EmployeeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/adminlogin', component: AdminLogin},
    { path: '/adminregister', component: EmployeeRegister},
    { path: '/register', component: Register },
    { path: '/createproduct', component: CreateProduct },
    { path: '/editproduct/:id', component: EditProduct, props: true  },
    { path: '/employeeView', component: EmployeeView},
    { path: '/waitingapproval', name: 'WaitingApproval', component: WaitingApproval, props: true,},
  ]
})

export default router
