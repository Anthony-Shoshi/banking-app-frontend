<template>
    <div id="app">
      <div class="sidebar">
        <h3>Employee Dashboard</h3>

        <ul>
          <li @click="showCustomers">Customers</li>
          <li @click="showTransactions">All Transactions</li>
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
                <td>{{ customer.name }}</td>
                <td>{{ customer.accountNumber }}</td>
                <td>
                  <button @click="viewTransactions(index)">View Transactions</button>
                </td>
              </tr>
            </tbody>
          </table>
          <p v-else>No customers available</p>
        </div>
        <h1 v-if="showingTransactions">All Transactions</h1>
        <div v-if="showingTransactions">
          <table v-if="transactions.length > 0">
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
          <p v-else>No transactions available</p>
        </div>
        <h1 v-if="selectedCustomer">Transaction History</h1>
        <div v-if="selectedCustomer">
          <h2>{{ selectedCustomer.name }}</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in selectedCustomer.transactions" :key="index">
                <td>{{ transaction.date }}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customers: [
          {
            name: 'Customer 1',
            accountNumber: '123456',
            transactions: [
              { date: '2024-05-01', amount: 100, description: 'Deposit' },
              { date: '2024-05-03', amount: -50, description: 'Withdrawal' },
              { date: '2024-05-07', amount: 200, description: 'Deposit' }
            ]
          },
          {
            name: 'Customer 2',
            accountNumber: '654321',
            transactions: [
              { date: '2024-05-02', amount: 150, description: 'Deposit' },
              { date: '2024-05-05', amount: -70, description: 'Withdrawal' },
              { date: '2024-05-09', amount: 300, description: 'Deposit' }
            ]
          }
        ],
        transactions: [
          {
            fromAccount: '123456',
            toAccount: '654321',
            amount: 100,
            timestamp: '2024-05-01 10:00:00',
            initiatingUser: 'Employee 1'
          },
          {
            fromAccount: '654321',
            toAccount: '123456',
            amount: 50,
            timestamp: '2024-05-03 12:00:00',
            initiatingUser: 'Customer 2'
          }
        ],
        selectedCustomerIndex: null,
        showingCustomers: false,
        showingTransactions: false
      };
    },
    computed: {
      selectedCustomer() {
        return this.selectedCustomerIndex !== null ? this.customers[this.selectedCustomerIndex] : null;
      }
    },
    methods: {
      viewTransactions(index) {
        this.selectedCustomerIndex = index;
      },
      showCustomers() {
        this.showingCustomers = true;
        this.showingTransactions = false;
        this.selectedCustomerIndex = null;
      },
      showTransactions() {
        this.showingCustomers = false;
        this.showingTransactions = true;
        this.selectedCustomerIndex = null;
      }
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
  