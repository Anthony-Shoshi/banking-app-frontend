<template>
  <nav v-if="!hideNavBar" class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li v-if="!isAuthenticated && !isAtmLogin" class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li v-if="isEmployee && isAuthenticated" class="nav-item">
          <router-link to="/employeeView" class="nav-link" active-class="active">Employee Dashboard</router-link>
        </li>
        <li v-if="isCustomer && isAuthenticated" class="nav-item">
          <router-link to="/customerDashboard" class="nav-link" active-class="active">Customer Dashboard</router-link>
        </li>
        <li v-if="!isAuthenticated && !isAtmLogin" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li v-if="!store.isLoggedIn && !isAuthenticated" class="nav-item">
          <router-link to="/atm/login" class="nav-link" active-class="active">ATM Login</router-link>
        </li>
      </ul>
      <div class="d-flex">
        <span v-if="store.isLoggedIn" class="navbar-text text-white me-3">Hello, {{ store.user.firstName }} {{
          store.user.lastName }}</span>
        <button v-if="store.isLoggedIn" @click="AtmLogout" class="btn btn-outline-light">Logout</button>
      </div>
      <div class="d-flex">
        <span v-if="isAuthenticated" class="navbar-text text-white me-3">Hello, {{ userName }}</span>
        <button v-if="isAuthenticated" @click="logoutHandler" class="btn btn-outline-light">Logout</button>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, watch } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { useStore } from '@/stores/customer';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'Navigation',
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const hideNavBar = ref(false);
    const isAtmLogin = ref(false);

    watch(
      () => route.path,
      (newPath) => {
        hideNavBar.value = newPath === '/atm/login';
        isAtmLogin.value = newPath.startsWith('/atm');
      },
      { immediate: true }
    );

    const logoutHandler = () => {
      store.logout();
      router.push('/');
    };

    const AtmLogout = () => {
      store.logout();
      router.push('/');
    };

    return { store, hideNavBar, isAtmLogin, route, router, logoutHandler, AtmLogout };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'isEmployee', 'isCustomer', 'userName']),
  },
  methods: {
    ...mapMutations(['logout']),
  },
};
</script>

<style scoped></style>
