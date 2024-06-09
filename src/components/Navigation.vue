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
          <router-link to="/login" class="nav-link" active-class="active"
                       @click.native="handleRegularLoginClick">Login</router-link>
        </li>
        <li v-if="!userStore.isLoggedIn && !isAuthenticated" class="nav-item">
          <router-link to="/atm/login" class="nav-link" active-class="active">ATM Login</router-link>
        </li>
      </ul>
      <div class="d-flex">
        <span v-if="userStore.isLoggedIn" class="navbar-text text-white me-3">Hello, {{ userStore.user.firstName }} {{
            userStore.user.lastName }}</span>
        <button v-if="userStore.isLoggedIn" @click="AtmLogout" class="btn btn-outline-light">Logout</button>
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
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/User';

export default {
  name: 'Navigation',
  setup() {
    const userStore = useUserStore();
    const route = useRoute();
    const router = useRouter();
    const hideNavBar = ref(false);
    const isAtmLogin = ref(false);

    watch(
        () => route.path,
        (newPath) => {
          hideNavBar.value = newPath === '/pending-approval';
        },
        { immediate: true }
    );

    const AtmLogout = () => {
      userStore.logout();
      router.push('/');
    };

    return { userStore, hideNavBar, isAtmLogin, route, router, AtmLogout };
  },
  computed: {
    isAuthenticated() {
      return this.userStore.isAuthenticated;
    },
    isEmployee() {
      return this.userStore.isEmployee;
    },
    isCustomer() {
      return this.userStore.isCustomer;
    },
    userName() {
      return this.userStore.userName;
    }
  },
  methods: {
    logoutHandler() {
      this.userStore.logout();
      this.$router.push('/');
    },
    handleRegularLoginClick() {
      if (this.userStore.isLoggedIn) {
        this.userStore.logout();
      }
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped></style>
