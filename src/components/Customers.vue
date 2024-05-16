<template>
    <div>
      <h1>Customers</h1>
      <div v-if="customers.length > 0">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Account Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in customers" :key="index">
              <td>{{ customer.name }}</td>
              <td>{{ customer.accountNumber }}</td>
              <td>
                <button @click="viewTransactions(customer)">View Transactions</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-else>No customers available</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customers: [
          { name: 'Customer 1', accountNumber: '12345' },
          { name: 'Customer 2', accountNumber: '67890' },
          // Add more customers as needed
        ]
      };
    },
    methods: {
      viewTransactions(customer) {
        // You can emit an event or use router navigation to view transactions for this customer
        console.log('View transactions for:', customer);
      }
    }
  };
  </script>
  