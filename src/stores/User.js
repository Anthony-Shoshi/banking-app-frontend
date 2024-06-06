import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state() {
        return {
            user: null,
            token: null,
        };
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
        isEmployee: (state) => state.user?.role === 'EMPLOYEE',
        isCustomer: (state) => state.user?.role === 'CUSTOMER',
        user: (state) => state.user,
        userName: (state) => `${state.user?.firstName} ${state.user?.lastName}`,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        },
        initializeStore(state) {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            if (user) {
                state.user = JSON.parse(user);
            }
            if (token) {
                state.token = token;
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },
    },
    actions: {
        async login({ commit }, { token }) {
            try {
                const decoded = decodeToken(token);
                if (!decoded) {
                    throw new Error("Failed to decode token.");
                }
                const user = {
                    id: decoded.sub,
                    role: decoded.auth,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                };
                commit('setUser', user);
                commit('setToken', token);
                return { success: true, message: "Login successful!" };
            } catch (error) {
                console.error("Login Error:", error);
                return { success: false, message: error.message || "Login failed. Please check your credentials." };
            }
        },
    },
});

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

store.commit('initializeStore');

export default store;
