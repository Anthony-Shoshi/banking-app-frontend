<template>
  <div>
    <h1>All Transactions</h1>
    <div v-if="transactions.length > 0">
      <table>
        <thead>
          <tr>
            <th>From Account</th>
            <th>To Account</th>
            <th>Transfer Amount</th>
            <th>Timestamp</th>
            <th>User Initiating Transfer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactions" :key="index">
            <td>{{ transaction.fromAccount }}</td>
            <td>{{ transaction.toAccount }}</td>
            <td>{{ transaction.amount }}</td>
            <td>{{ transaction.timestamp }}</td>
            <td>{{ transaction.initiatingUser }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No transactions available</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      transactions: []
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      axios.get('http://localhost:8080/transactions')
        .then(response => {
          this.transactions = response.data; // Update the transactions data with the response from the backend
        })
        .catch(error => {
          console.error('There was a problem with the Axios request:', error);
        });
    }
  }
};
</script>
