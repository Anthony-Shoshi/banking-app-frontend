import { createRouter, createWebHistory } from 'vue-router';
import store from '../stores/User.js';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import CustomerDashboard from '../components/User/UserDashboard.vue';
import EmployeeView from '../components/EmployeeView.vue';
import Customers from '../components/Customers/Customers.vue';
import CustomerTransaction from '../components/Customers/CustomerTransaction.vue';
import ViewTransactionsList from '../components/Transactions/ViewTransactionsList.vue';
import CustomersWithoutAccounts from '../components/Customers/customers-without-accounts.vue';
import Transfer from '../components/Admin/Transfer.vue';
import ATMInterface from '../components/User/ATM/ATMInterface.vue';
import ATMLogin from '../components/User/ATM/ATMLogin.vue';
import TransactionHistory from '../components/User/TransactionHistory.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/customerDashboard', component: CustomerDashboard, meta: { role: 'CUSTOMER' } },
  { path: '/employeeView', component: EmployeeView, meta: { role: 'EMPLOYEE' } },
  { path: '/employees/customer-accounts', component: Customers, meta: { role: 'EMPLOYEE' } },
  { path: '/employees/customers-without-accounts', component: CustomersWithoutAccounts, meta: { role: 'EMPLOYEE' } },
  { path: '/customers/:customerId/transactions', component: CustomerTransaction, meta: { role: 'CUSTOMER' } },
  { path: '/transactions', component: ViewTransactionsList, meta: { role: 'EMPLOYEE' } },
  { path: '/transfer', component: Transfer, meta: { role: 'EMPLOYEE' } },
  { path: '/atm/login', component: ATMLogin },
  { path: '/atm', component: ATMInterface },
  { path: '/transaction-history', component: TransactionHistory }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredRole = to.meta.role;

  if (requiresAuth && !store.getters.isAuthenticated) {
    next('/login');
  } else if (requiresAuth && requiredRole && !store.getters[requiredRole.toLowerCase()]) {
    next('/');
  } else {
    next();
  }
});

export default router;
