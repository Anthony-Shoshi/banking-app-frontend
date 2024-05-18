import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import AdminLogin from '../components/Admin/Login.vue';
import Register from '../components/Register.vue';
import EmployeeRegister from '../components/Admin/Register.vue';
import WaitingApproval from '../components/WaitingApproval.vue';
import EmployeeView from '../components/EmployeeView.vue';
import Customers from '../components/Customers.vue'; // Import the Customers component
import ViewTransactionsList from '../components/Transactions/ViewTransactionsList.vue';
import CustomersWithoutAccounts from '../components/customers-without-accounts.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/adminlogin', component: AdminLogin},
    { path: '/adminregister', component: EmployeeRegister},
    { path: '/register', component: Register },  
    { path: '/employeeView', component: EmployeeView},
    { path: '/waitingapproval', name: 'WaitingApproval', component: WaitingApproval, props: true,},
    { path: '/employees/customer-accounts', component: Customers }, // Add the Customers route
    { path: '/transactions', component: ViewTransactionsList }, // Add the Transactions route
    { path: '/employees/customers-without-accounts', component: CustomersWithoutAccounts},
  ]
});

export default router;
