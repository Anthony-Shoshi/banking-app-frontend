import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/User';
import Home from '../components/Home.vue';
import Login from '../components/Login.vue';
import PendingApproval from '../components/PendingApproval.vue';
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
import FundTransfer from '../components/User/FundTransfer.vue';
import FundTransferOwn from '../components/User/FundTransferOwn.vue';
import CustomerHome from '../components/User/CustomerHome.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/pending-approval', component: PendingApproval },
    {
        path: '/employeeView',
        component: EmployeeView,
        meta: { role: 'ROLE_EMPLOYEE' },
    },
    {
        path: '/employees/customer-accounts',
        component: Customers,
        meta: { role: 'ROLE_EMPLOYEE' },
    },
    {
        path: '/employees/customers-without-accounts',
        component: CustomersWithoutAccounts,
        meta: { role: 'ROLE_EMPLOYEE' },
    },
    {
        path: '/customers/:customerId/transactions',
        component: CustomerTransaction,
        meta: { role: 'ROLE_CUSTOMER' },
    },
    {
        path: '/transactions',
        component: ViewTransactionsList,
        meta: { role: 'ROLE_EMPLOYEE' },
    },
    { path: '/transfer', component: Transfer, meta: { role: 'ROLE_EMPLOYEE' } },
    {
        path: '/customerDashboard',
        component: CustomerDashboard,
        meta: { role: 'ROLE_CUSTOMER' },
        children: [
            { path: '', component: CustomerHome, meta: { role: 'ROLE_CUSTOMER' } },
            { path: '/transaction-history', component: TransactionHistory, meta: { role: 'ROLE_CUSTOMER' } },
            { path: '/fund-transfer', component: FundTransfer, meta: { role: 'ROLE_CUSTOMER' } },
            { path: '/fund-transfer-own', component: FundTransferOwn, meta: { role: 'ROLE_CUSTOMER' } },
        ],
    },
    { path: '/atm/login', component: ATMLogin },
    { path: '/atm', component: ATMInterface },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    const requiredRole = to.meta.role;
    const isAuthenticated = userStore.isAuthenticated;
    const userRole = userStore.user?.role;

    if (requiredRole && !isAuthenticated) {
        next('/login');
    } else if (requiredRole && userRole !== requiredRole) {
        next('/');
    } else {
        next();
    }
});

export default router;
