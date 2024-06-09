<template>
  <div class="pending-approval">
    <h1 class="welcome-text">Welcome to FAFA Bank</h1>
    <h2>Your account is pending approval</h2>
    <p>Please wait for an administrator to approve your account. You will be able to use our services once your account is approved.</p>
    <button @click="logoutHandler" class="btn btn-outline-dark">Logout</button>
  </div>
</template>

<script>

import { useUserStore } from '@/stores/User';

export default {
  name: 'PendingApproval',
  setup() {
    const store = useUserStore(); // Use the user store

    const logoutHandler = () => {
      store.commit('logout'); // Call the logout method from the user store
      // Redirect to home ("/") after logout
      window.location.href = "/";
    };

    return { logoutHandler };
  }
}
</script>

<style scoped>
.pending-approval {
  text-align: center;
  margin-top: 50px;
}
.welcome-text {
  color: #60BFC1;
  font-size: 80px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 50px;
}
.btn-outline-dark{
  margin-top: 30px;
  font-size: 20px;
}
</style>
