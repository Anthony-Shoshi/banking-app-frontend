<template>
  <div id="app">
    <div class="sidebar">
      <h3>Employee Dashboard</h3>
      <ul>
        <li @click="showCustomers">Customers</li>
      </ul>
    </div>
    <div class="main">
      <h1 v-if="showingCustomers">Customers</h1>
      <div v-if="showingCustomers">
        <table v-if="customers.length > 0">
          <thead>
          <tr>
            <th>Name</th>
            <th>Account Number</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(customer, index) in customers" :key="index">
            <td>{{ customer.customerName }}</td>
            <td>{{ customer.IBAN }}</td>
            <td>
              <button @click="viewCustomerDetails(index)">View Details</button>
            </td>
          </tr>
          </tbody>
        </table>
        <p v-else>No customers available</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios'; // Assuming you have a custom axios instance
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const customers = ref([]);
    const showingCustomers = ref(false);
    const selectedCustomerIndex = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get('/employees/customer-accounts');
        if (response.data && response.data.length) {
          customers.value = response.data;
        } else {
          console.error("No customers found");
        }
      } catch (error) {
        console.error("Failed to fetch customer accounts:", error);
      }
    });

    function showCustomers() {
      showingCustomers.value = true;
    }

    function viewCustomerDetails(index) {
      selectedCustomerIndex.value = index;
      // Implement logic to view details
    }

    return { customers, showCustomers, showingCustomers, viewCustomerDetails };
  }
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

  .sidebar h2 {
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

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table th, table td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  table th {
    background-color: #f2f2f2;
  }
  </style>
