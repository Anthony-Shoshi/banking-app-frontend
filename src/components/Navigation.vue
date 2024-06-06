<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li v-if="isEmployee && isAuthenticated" class="nav-item">
          <router-link to="/employeeView" class="nav-link" active-class="active">Employee Dashboard</router-link>
        </li>
        <!-- <li v-if="isEmployee && isAuthenticated" class="nav-item">
          <router-link to="/transactions" class="nav-link" active-class="active">Transactions</router-link>
        </li> -->
        <li v-if="isCustomer && isAuthenticated" class="nav-item">
          <router-link to="/customerDashboard" class="nav-link" active-class="active">Customer Dashboard</router-link>
        </li>
        <li v-if="!isAuthenticated" class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li v-if="!store.isLoggedIn" class="nav-item">
          <router-link to="/atm/login" class="nav-link" active-class="active">ATM Login</router-link>
        </li>
      </ul>
      <div class="d-flex">
        <span v-if="store.isLoggedIn" class="navbar-text text-white me-3">Hello, {{ store.user.firstName }} {{ store.user.lastName }}</span>
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
import { mapGetters, mapMutations } from 'vuex';
import { useStore } from '@/stores/customer';

export default {
  name: 'Navigation',
  computed: {
    ...mapGetters(['isAuthenticated', 'isEmployee', 'isCustomer', 'userName']),
  },
  setup() {
    const store = useStore();
    return { store };
  },
  methods: {
    ...mapMutations(['logout']),
    logoutHandler() {
      // Call logout mutation to clear user state
      this.logout();
      // Redirect to home ("/") after logout
      this.$router.push('/');
    },
    AtmLogout() {
      this.store.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style scoped></style>
