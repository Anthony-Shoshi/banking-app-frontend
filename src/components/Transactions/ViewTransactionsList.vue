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
          <tr v-for ="(transaction, index) in transactions" :key="index">
            <td>{{ transaction.fromAccountIban }}</td>
            <td>{{ transaction.toAccountIban }}</td>
            <td>{{ transaction.transferAmount }}</td>
            <td>{{ transaction.currentTime }}</td>
            <td>
              {{
                `${transaction.firstName} ${transaction.lastName} / ${transaction.initiatedBy}`
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-else>No transactions available</p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TransactionList',
  computed: mapState(['transactions']),
  data() {
    return {
      loading: false,
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions(['fetchTransactions']),
    async loadTransactions() {
      this.loading = true;
      try {
        await this.fetchTransactions();
      } catch (error) {
        this.errorMessage = 'Failed to load transactions. Please try again.';
        console.error('Fetch Transactions Error:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.loadTransactions();
  }
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

