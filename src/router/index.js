import { createRouter, createWebHistory } from "vue-router";

import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import AdminDashboard from "../components/admin/Dashboard.vue";
import UserDashboard from "../components/User/UserDashboard.vue";
import WaitingApproval from "../components/WaitingApproval.vue";
import EmployeeView from "../components/EmployeeView.vue";
import Customers from "../components/Customers/Customers.vue";
import CustomerTransaction from "../components/Customers/CustomerTransaction.vue";
import ViewTransactionsList from "../components/Transactions/ViewTransactionsList.vue";
import CustomersWithoutAccounts from "../components/customers-without-accounts.vue";
import Transfer from "../components/Admin/Transfer.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", component: Home },
        { path: "/login", component: Login },
        { path: "/register", component: Register },
        { path: "/adminDashboard", component: AdminDashboard },
        { path: "/userDashboard", component: UserDashboard },
        { path: "/employeeView", component: EmployeeView },
        { path: "/employees/customer-accounts", component: Customers },
        { path: "/transfer", component: Transfer },
        {
            path: "/employees/customers-without-accounts",
            component: CustomersWithoutAccounts,
        },
        {
            path: "/customers/:customerId/transactions",
            component: CustomerTransaction,
        },
        { path: "/transactions", component: ViewTransactionsList },
        {
            path: "/waitingapproval",
            name: "WaitingApproval",
            component: WaitingApproval,
            props: true,
        },
    ],
});

export default router;
