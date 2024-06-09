<template>
    <div class="m-3">
        <h2>Transfer Between Your Accounts</h2>
        <form @submit.prevent="transferFunds" class="row g-3">
            <div class="col-md-6">
                <label for="fromAccountIban" class="form-label">From Account</label>
                <select id="fromAccountIban" v-model="transfer.fromAccountIban" class="form-select" required>
                    <option v-for="account in accounts" :key="account.accountId" :value="account.IBAN">
                        {{ account.accountType }} - {{ account.IBAN }}
                    </option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="toAccountIban" class="form-label">To Account</label>
                <select id="toAccountIban" v-model="transfer.toAccountIban" class="form-select" required>
                    <option v-for="account in accounts" :key="account.accountId" :value="account.IBAN">
                        {{ account.accountType }} - {{ account.IBAN }}
                    </option>
                </select>
            </div>
            <div class="col-md-6">
                <label for="transferAmount" class="form-label">Amount</label>
                <input type="number" class="form-control" id="transferAmount" min="0"
                    v-model.number="transfer.transferAmount" required>
            </div>
            <div class="col-md-6 d-flex align-items-end">
                <button type="submit" class="btn btn-primary">Transfer</button>
            </div>
        </form>

        <div v-if="transferResult" class="mt-4">
            <h3>Transfer Result</h3>
            <p><strong>From:</strong> {{ transferResult.fromAccountIban }}</p>
            <p><strong>To:</strong> {{ transferResult.toAccountIban }}</p>
            <p><strong>Amount:</strong> {{ transferResult.transferAmount }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { useStore } from '@/stores/customer.js';

export default {
    name: 'FundTransferOwn',
    data() {
        return {
            accounts: [],
            transfer: {
                fromAccountIban: '',
                toAccountIban: '',
                transferAmount: null,
            },
            transferResult: null,
            errorMessage: '',
        };
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods: {
        async fetchAccounts() {
            const user = JSON.parse(localStorage.getItem('user'));
            try {
                const response = await axios.get(`http://localhost:8080/accounts/${user.customerID}`);
                this.accounts = response.data;
            } catch (error) {
                console.error('Error fetching accounts:', error);
            }
        },
        async transferFunds() {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.post('http://localhost:8080/transactions', this.transfer, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.transferResult = response.data;
                this.errorMessage = '';
                this.fetchAccounts();
            } catch (error) {
                console.error('Error transferring funds:', error);
            }
        },
    },
    mounted() {
        this.fetchAccounts();
    }
};
</script>

<style scoped>
form {
    margin-bottom: 20px;
}
</style>
