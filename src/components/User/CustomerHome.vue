<template>
  <div>
    <h2 class="mb-4">Welcome, {{ user.firstName }} {{ user.lastName }}</h2>
    <hr>
    <h3>Your Accounts</h3>
    <div class="row">
      <div class="col-md-6" v-for="account in accounts" :key="account.accountId">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">{{ account.accountType }} Account</h5>
            <p class="card-text"><strong>IBAN:</strong> {{ account.IBAN }}</p>
            <p class="card-text"><strong>Balance:</strong> €{{ account.balance }}</p>
            <p class="card-text"><strong>Status:</strong> {{ account.status }}</p>
            <p class="card-text"><strong>Daily Limit:</strong> €{{ account.dailyLimit }}</p>
            <p class="card-text"><strong>Absolute Limit:</strong> €{{ account.absoluteLimit }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/User';

export default {
  name: "CustomerHome",
  data() {
    return {
      user: {},
      accounts: []
    };
  },
  methods: {
    async fetchCustomerDetails() {
      const userStore = useUserStore(); // Access the user store
      const user = userStore.user; // Access the user object from the store
      try {
        const response = await axios.get(`https://fafabank-app-z7hg.onrender.com/accounts/${user.customerId}`);
        this.accounts = response.data;
        this.user = user;
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    }
  },
  mounted() {
    this.fetchCustomerDetails();
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
