<template>
  <div id="app">
    <div class="sidebar">
      <h3>Employee Dashboard</h3>
      <ul>
        <li @click="goToCustomers">Customers</li>
        <li @click="goToTransactions">All Transactions</li>
        <li @click="goCustomersWithoutAccounts">Customers without accounts</li>
        <li @click="goTransfer">Transfer</li>
      </ul>
    </div>
    <div class="main">
      <h1>Transfer</h1>
      <div class="transfer-form">
        <form @submit.prevent="transferMoney">
          <div class="form-group">
            <label for="fromAccountIban">Source Account:</label>
            <input
              type="text"
              id="sourceAccount"
              v-model="fromAccountIban"
              required
            />
          </div>
          <div class="form-group">
            <label for="toAccountIban">Destination Account:</label>
            <input
              type="text"
              id="destinationAccount"
              v-model="toAccountIban"
              required
            />
          </div>
          <div class="form-group">
            <label for="amount">Amount:</label>
            <input
              type="number"
              id="transferAmount"
              v-model="transferAmount"
              required
            />
          </div>
          <button type="submit">Transfer</button>
        </form>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fromAccountIban: "",
      toAccountIban: "",
      transferAmount: 0,
    };
  },
  methods: {
    goToCustomers() {
      this.$router.push({ path: "/employees/customer-accounts" });
    },
    goToTransactions() {
      this.$router.push({ path: "/transactions" });
    },
    goCustomersWithoutAccounts() {
      this.$router.push({ path: "/employees/customers-without-accounts" });
    },
    goTransfer() {
      this.$router.push({ path: "/transfer" });
    },
    async transferMoney() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        console.log(`Token: ${token}`); // Log the token

        const response = await axios.post(
          "http://localhost:8080/transactions",
          {
            fromAccountIban: this.fromAccountIban,
            toAccountIban: this.toAccountIban,
            transferAmount: this.transferAmount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        alert(`Transfer successful: ${response.data}`);
      } catch (error) {
        console.error("There was an error with the transfer:", error);
        alert(
          `Error: ${
            error.response ? error.response.data.message : error.message
          }`
        );
      }
    },
  },
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
}

.sidebar {
  background-color: #333;
  color: #fff;
  width: 250px;
  padding: 20px;
}

.sidebar h3 {
  margin-bottom: 20px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 5px;
}

.sidebar ul li:hover {
  background-color: #555;
}

.main {
  flex: 1;
  padding: 20px;
}

.main h1 {
  margin-bottom: 20px;
}

.transfer-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>
