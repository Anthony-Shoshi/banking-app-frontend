import { defineStore } from 'pinia';
import axios from 'axios';
import store from "@/stores/User";

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
                const response = await axios.post('http://localhost:8080/login', { email, password });
                this.token = response.data.token;
                this.user = response.data;
                this.isLoggedIn = true;
                this.getAccounts(this.user.userId);
            } catch (error) {
                throw new Error(error.response.data || 'Login failed');
            }
        },
        async getAccounts(userId) {
            try {
                const response = await axios.get('http://localhost:8080/accounts/' + userId);
                this.accounts = response.data;
            } catch (error) {
                console.error('Fetching accounts failed:', error);
            }
        },
        async deposit(accountId, amount) {
            try {
                const response = await axios.post('http://localhost:8080/customers/deposit', {
                    accountId,
                    amount,
                });
                this.getAccounts(this.user.userId);
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
                const response = await axios.post('http://localhost:8080/customers/withdraw', {
                    accountId,
                    amount,
                });
                this.getAccounts(this.user.userId);
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
        },
    },

});
