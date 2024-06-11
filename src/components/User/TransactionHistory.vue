<template>
    <div class="m-3">
        <h2>Transaction History</h2>
        <form @submit.prevent="fetchTransactions">
            <div class="row">
                <div class="col-md-4">
                    <label for="startDate" class="form-label">Start Date</label>
                    <input type="date" class="form-control" id="startDate" v-model="filters.startDate">
                </div>
                <div class="col-md-4">
                    <label for="endDate" class="form-label">End Date</label>
                    <input type="date" class="form-control" id="endDate" v-model="filters.endDate">
                </div>
                <div class="col-md-4">
                    <label for="iban" class="form-label">IBAN</label>
                    <input type="text" class="form-control" id="iban" v-model="filters.iban">
                </div>
            </div>
            <div class="row">
                <div class="col-md-4">
                    <label for="fromAmount" class="form-label">From Amount</label>
                    <input type="number" class="form-control" id="fromAmount" min="0"
                        v-model.number="filters.fromAmount">
                </div>
                <div class="col-md-4">
                    <label for="toAmount" class="form-label">To Amount</label>
                    <input type="number" class="form-control" id="toAmount" min="0" v-model.number="filters.toAmount">
                </div>
                <div class="col-md-4 d-flex align-items-end">
                    <button type="submit" class="btn btn-primary">Filter</button>
                </div>
            </div>
        </form>

        <div class="table-container">
            <table class="table table-responsive table-striped table-hover mt-3">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Initiated By</th>
                        <th>From Account IBAN</th>
                        <th>To Account IBAN</th>
                        <th>Transfered By</th>
                        <th>Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="transactions.length === 0">
                        <td colspan="9" class="text-center">No data found</td>
                    </tr>
                    <tr v-else v-for="transaction in transactions" :key="transaction.currentTime">
                        <td>{{ transaction.currentTime }}</td>
                        <td>{{ transaction.transferAmount }}</td>
                        <td>{{ transaction.initiatedBy }}</td>
                        <td>{{ transaction.fromAccountIban }}</td>
                        <td>{{ transaction.toAccountIban }}</td>
                        <td>{{ transaction.firstName }} {{ transaction.lastName }}</td>
                        <td>{{ transaction.type }}</td>
                        <td>{{ transaction.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/stores/customer.js';
import axios from 'axios';

export default {
    name: 'TransactionHistory',
    data() {
        return {
            filters: {
                startDate: '',
                endDate: '',
                fromAmount: null,
                toAmount: null,
                iban: null,
            },
            transactions: [],
        };
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods: {
        async fetchTransactions() {
            console.log('Fetching transactions...');
            const { user } = this.store;
            const params = {
                customerId: user.customerId,
                ...this.filters,
            };

            try {
                const response = await axios.get('https://fafabank-app.onrender.com/customers/transaction-history', { params });
                console.log('Response:', response.data);
                this.transactions = response.data;
            } catch (error) {
                console.error('Failed to fetch transaction history:', error);
            }
        },
    },
    mounted() {
        this.fetchTransactions();
    },
};
</script>

<style scoped>
form {
    margin-bottom: 20px;
}

.table {
    width: 100%;
    margin-top: 20px;
}

.table-container {
    height: calc(100vh - 150px);
    overflow-y: auto;
}

.table th,
.table td {
    white-space: nowrap;
}
</style>
