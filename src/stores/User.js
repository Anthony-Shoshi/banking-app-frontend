import { createStore } from 'vuex';

export default createStore({
    state: {
        firstName: '',
        lastName: '',
        role: '',
        isLoggedIn: false,
    },
    mutations: {
        setUser(state, user) {
            state.firstName = user.firstName;
            state.lastName = user.lastName;
            state.role = user.role;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.firstName = '';
            state.lastName = '';
            state.role = '';
            state.isLoggedIn = false;
            localStorage.removeItem('token');
        }
    },
    actions: {},
    modules: {}
});
