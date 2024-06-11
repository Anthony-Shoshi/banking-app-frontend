import { defineStore } from 'pinia';
import axios from 'axios';

function decodeToken(token) {
    try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );
        const decoded = JSON.parse(jsonPayload);

        if (decoded.exp * 1000 < Date.now()) {
            console.error("Token expired");
            return null;
        }
        return decoded;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}

export const useStore = defineStore('customer', {
    state: () => ({
        token: '',
        accounts: [],
        user: JSON.parse(localStorage.getItem('user')) || {},
        isLoggedIn: false,
    }),
    actions: {
        async login(email, password) {
            try {
                const response = await axios.post('https://fafabank-app.onrender.com/login', { email, password });
                this.token = response.data.token;
                const decodedToken = decodeToken(this.token);
                if (!decodedToken) {
                    throw new Error('Invalid token');
                }
                this.user = {
                    firstName: decodedToken.firstName,
                    lastName: decodedToken.lastName,
                    customerId: decodedToken.customerId,
                    email: decodedToken.email,
                    role: decodedToken.auth,
                };
                this.isLoggedIn = true;
                localStorage.setItem('token', this.token);
                localStorage.setItem('user', JSON.stringify(this.user));
                this.getAccounts(this.user.customerId);
            } catch (error) {
                throw new Error(error.response?.data || 'Login failed');
            }
        },
        async getAccounts(userId) {
            try {
                const response = await axios.get('https://fafabank-app.onrender.com/accounts/' + userId);
                this.accounts = response.data;
            } catch (error) {
                console.error('Fetching accounts failed:', error);
            }
        },
        async deposit(accountId, amount) {
            try {
                const response = await axios.post('https://fafabank-app.onrender.com/customers/deposit', {
                    accountId,
                    amount,
                });
                this.getAccounts(this.user.customerId);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data);
                } else {
                    console.error('Deposit failed:', error);
                }
            }
        },
        async withdraw(accountId, amount) {
            try {
                const response = await axios.post('https://fafabank-app.onrender.com/customers/withdraw', {
                    accountId,
                    amount,
                });
                this.getAccounts(this.user.customerId);
                return response.data;
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    alert(error.response.data);
                } else {
                    console.error('Withdrawal failed:', error);
                }
            }
        },
        logout() {
            this.token = '';
            this.user = {};
            this.accounts = [];
            this.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});
