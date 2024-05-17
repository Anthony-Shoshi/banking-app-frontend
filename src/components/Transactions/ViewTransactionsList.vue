<template>
  <div>
    <h1 class="transactionHead">All Transactions</h1>
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
            <td>{{ transaction.fromAccountIban }}</td>
            <td>{{ transaction.toAccountIban }}</td>
            <td>{{ transaction.transferAmount }}</td>
            <td>{{ transaction.currentTime }}</td>
            <td>{{ `${transaction.firstName} ${transaction.lastName} / ${transaction.initiatedBy}` }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No transactions available</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      transactions: [],
    };
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    fetchTransactions() {
      axios
        .get("http://localhost:8080/transactions")
        .then((response) => {
          this.transactions = response.data;
        })
        .catch((error) => {
          console.error("There was a problem with the Axios request:", error);
        });
    },
  },
};
</script>


<style scoped>
.transactionHead{
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

