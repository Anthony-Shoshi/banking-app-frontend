<template>
  <div>
    <h1 class="transactionHead">Customers</h1>
    <div v-if="customers.length > 0 && selectedCustomerIndex === null">
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
          <td>{{ customer.IBAN }}</td>
          <td>{{ customer.IBAN }}</td>
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
  setup() {
    const customers = ref([]);
    const selectedCustomerIndex = ref(null);

    onMounted(async () => {
      try {
        const response = await axios.get("http://localhost:8080/employees/customer-accounts");
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

    return { customers, selectedCustomerIndex, viewCustomerDetails };
  },
};
</script>


<style scoped>
.transactionHead {
  margin: auto 20px;
}

table {
  border-collapse: collapse;
  width: 90%;
  margin: auto 20px;
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
