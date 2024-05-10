<template>
  <div class="waiting-approval">
    <div class="message">
      <p>Thank you for choosing FAFA bank, your request has been sent to the team and you will hear back from us in 2-3
        working days. Your patience is appreciated.</p>
    </div>
    <div class="user-info" v-if="userInfo">
      <h2>Entered Information:</h2>
      <ul>
        <li>First Name: {{ userInfo.firstName }}</li>
        <li>Last Name: {{ userInfo.lastName }}</li>
        <li>Gender: {{ userInfo.gender }}</li>
        <li>Email: {{ userInfo.email }}</li>
        <li>Account Type: {{ userInfo.accountType }}</li>
        <li>BSN: {{ userInfo.bsn }}</li>
        <li>Phone Number: {{ userInfo.phoneNumber }}</li>
      </ul>
    </div>
    <div v-else>
      <p>No user information available.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const userInfo = ref({});

onMounted(() => {
  userInfo.value = route.params.userInfo || {};
});
</script>

<style scoped>
/* Styles for WaitingApproval component */
</style>
