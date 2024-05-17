<template>
    <div>
      <h1>Customers</h1>
      <div v-if="customers.length > 0">
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
                <button @click="viewCustomerDetails(index)">
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <p v-else>No customers available</p>
    </div>
  </template>
  

  <script>
  import axios from "axios"; // Use this if using default axios
  
  // If you have a custom axios instance, import it like this:
  // import axios from "@/plugins/axios"; 
  
  import { onMounted, ref } from "vue";
  
  export default {
    setup() {
      const customers = ref([]);
      const showingCustomers = ref(false);
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
  
      function showCustomers() {
        showingCustomers.value = true;
      }
  
      function viewCustomerDetails(index) {
        selectedCustomerIndex.value = index;
        // Implement logic to view details
      }
  
      return { customers, showCustomers, showingCustomers, viewCustomerDetails };
    },
  };
  </script>
  