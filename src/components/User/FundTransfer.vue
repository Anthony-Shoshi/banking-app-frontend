<template>
    <div class="m-3">
        <h2>Transfer</h2>
        <form @submit.prevent="searchIban" class="row g-3">
            <div class="col-md-3">
                <label for="firstName" class="form-label">First Name</label>
                <input type="text" class="form-control" id="firstName" v-model="search.firstName" required>
            </div>
            <div class="col-md-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input type="text" class="form-control" id="lastName" v-model="search.lastName" required>
            </div>
            <div class="col-md-2 d-flex align-items-end">
                <button type="submit" class="btn btn-primary">Search IBAN</button>
            </div>
        </form>

        <div v-if="searchResult">
            <h3>Search Result</h3>
            <p>
                <strong>IBAN:</strong> {{ searchResult.iban }}
                <button class="btn btn-link" @click="copyIban">
                    <i class="bi bi-copy"></i>
                </button>
            </p>
        </div>

        <div v-if="errorMessage">
            <h3>Search Result</h3>
            <p><strong>IBAN:</strong> {{ errorMessage }}</p>
        </div>

        <form @submit.prevent="transferFunds" class="row g-3 mt-4">
            <div class="col-md-4">
                <label for="fromAccountIban" class="form-label">From Account IBAN</label>
                <input type="text" class="form-control" id="fromAccountIban" v-model="transfer.fromAccountIban"
                    disabled>
            </div>
            <div class="col-md-4">
                <label for="toAccountIban" class="form-label">To Account IBAN</label>
                <input type="text" class="form-control" id="toAccountIban" v-model="transfer.toAccountIban" required>
            </div>
            <div class="col-md-2">
                <label for="transferAmount" class="form-label">Amount</label>
                <input type="number" class="form-control" id="transferAmount" min="0"
                    v-model.number="transfer.transferAmount" required>
            </div>
            <div class="col-md-2 d-flex align-items-end">
                <button type="submit" class="btn btn-primary">Transfer</button>
            </div>
        </form>

        <div v-if="transferResult">
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
    name: 'FundTransfer',
    data() {
        return {
            search: {
                firstName: '',
                lastName: '',
            },
            searchResult: null,
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
        async searchIban() {
            try {
                const response = await axios.get('https://fafabank-app.onrender.com/customers/search-iban', {
                    params: {
                        firstName: this.search.firstName,
                        lastName: this.search.lastName,
                    },
                });
                this.searchResult = response.data;
                this.errorMessage = '';
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    this.errorMessage = 'No current account found for the given customer name';
                } else {
                    console.error('Error searching IBAN:', error);
                }
            }
        },
        async transferFunds() {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.post('https://fafabank-app.onrender.com/transactions', this.transfer, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.transferResult = response.data;
                this.errorMessage = '';
            } catch (error) {
                console.error('Error transferring funds:', error);
            }
        },
        copyIban() {
            navigator.clipboard.writeText(this.searchResult.iban)
                .then(() => {
                    alert('IBAN copied to clipboard');
                })
                .catch(err => {
                    console.error('Could not copy text: ', err);
                });
        },
        async getUserIban() {
            // const user = this.store.user;
            const user = JSON.parse(localStorage.getItem('user'));
            if (user && user.firstName && user.lastName) {
                try {
                    const response = await axios.get('https://fafabank-app.onrender.com/customers/search-iban', {
                        params: {
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                    });
                    this.transfer.fromAccountIban = response.data.iban;
                } catch (error) {
                    console.error('Error fetching user IBAN:', error);
                }
            }
        }
    },
    mounted() {
        this.getUserIban();
    }
};
</script>

<style scoped>
form {
    margin-bottom: 20px;
}
</style>
