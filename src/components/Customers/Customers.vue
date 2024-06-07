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
      <h1 class="transactionHead">Customers</h1>
      <div v-if="customers.length > 0 && selectedCustomerIndex === null">
        <table v-if="customers.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="index" @click="openDailyLimitForm(customer.accountId)">
              <td>{{ customer.customerName }}</td>
              <td>{{ customer.IBAN }}</td>
              <td>{{ customer.accountType }}</td>
              <td>
                <button @click="viewCustomerDetails(index)">
                  Transactions
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else-if="customers.length === 0">No customers available</p>
      <CustomerTransactions
        v-if="selectedCustomerIndex !== null"
        :customerId="customers[selectedCustomerIndex].customerId"
        :customerName="customers[selectedCustomerIndex].customerName"
        @back="selectedCustomerIndex = null"
      />
      <div v-if="showDailyLimitForm">
        <h2 class="transactionHead">Update Daily Limit</h2>
        <form class="transactionHead" @submit.prevent="updateDailyLimit">
          <label for="DailyLimit">New Daily Limit:</label>
          <input type="number" id="DailyLimit" v-model="newDailyLimit" required />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import CustomerTransactions from "./CustomerTransaction.vue";

export default {
  components: {
    CustomerTransactions,
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
  },
  setup() {
    const customers = ref([]);
    const selectedCustomerIndex = ref(null);
    const showDailyLimitForm = ref(false);
    const accountIdToUpdate = ref(null);
    const newDailyLimit = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/employees/customer-accounts"
        );
        if (response.data && response.data.length) {
          customers.value = response.data;
        } else {
          console.error("No customers found");
        }
      } catch (error) {
        console.error("Failed to fetch customer accounts:", error);
      }
    });

    function viewCustomerDetails(index) {
      selectedCustomerIndex.value = index;
    }

    function openDailyLimitForm(accountId) {
      showDailyLimitForm.value = true;
      accountIdToUpdate.value = accountId;
    }

    async function updateDailyLimit() {
      try {
        await axios.put(`http://localhost:8080/employees/update-daily-limit`, {
          accountId: accountIdToUpdate.value,
          DailyLimit: newDailyLimit.value,
        });
        alert("Daily limit updated successfully.");
        showDailyLimitForm.value = false;
      } catch (error) {
        alert("Failed to update daily limit: " + error.response.data);
      }
    }

    return {
      customers,
      selectedCustomerIndex,
      viewCustomerDetails,
      openDailyLimitForm,
      showDailyLimitForm,
      updateDailyLimit,
      newDailyLimit,
    };
  },
};
</script>


<style scoped>
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

.transactionHead {
  margin: 30px 20px;
}

table {
  border-collapse: collapse;
  width: 90%;
  margin: 50px 20px;
}

th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}

thead {
  background-color: #f2f2f2;
}
</style>
