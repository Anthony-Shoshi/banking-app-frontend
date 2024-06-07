import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            user: null,
        };
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
        isEmployee: (state) => state.user?.role === 'EMPLOYEE',
        isCustomer: (state) => state.user?.role === 'CUSTOMER',
        userName: (state) => `${state.user?.firstName} ${state.user?.lastName}`,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        },
        initializeStore(state) {
            const user = localStorage.getItem('user');
            if (user) {
                state.user = JSON.parse(user);
            }
        },
    },
    actions: {
        login({ commit }, user) {
            commit('setUser', user);
        },
        logout({ commit }) {
            commit('logout');
            // Redirect to home ("/") after logout
            window.location.href = "/";
        },
    },
});

// Initialize store with user data from local storage
store.commit('initializeStore');

export default store;
