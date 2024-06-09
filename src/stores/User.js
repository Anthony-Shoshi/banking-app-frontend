import { defineStore } from 'pinia';
import axios from 'axios';

// Helper function to decode JWT token
function decodeToken(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
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

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.user,
        isEmployee: (state) => state.user?.role === 'ROLE_EMPLOYEE',
        isCustomer: (state) => state.user?.role === 'ROLE_CUSTOMER',
        userName: (state) => `${state.user?.firstName} ${state.user?.lastName}`,
    },
    actions: {
        setUser(user) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },

        setToken(token) {
            this.token = token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },

        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },

        async login({ username, password }) {
            try {
                const response = await axios.post('http://localhost:8080/login', {
                    email: username,
                    password: password,
                });
                const { token } = response.data;
                const decoded = decodeToken(token);
                if (!decoded) {
                    throw new Error("Failed to decode token.");
                }
                const user = {
                    id: decoded.sub,
                    role: decoded.auth,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                    customerId: decoded.customerId,
                    approved: decoded.approved,
                };
                this.setUser(user);
                this.setToken(token);
                return { success: true, user };
            } catch (error) {
                console.error("Login Error:", error);
                return { success: false, message: error.message || "Login failed. Please check your credentials." };
            }
        },
    },
});