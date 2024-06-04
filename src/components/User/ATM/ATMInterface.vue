<template>
    <div class="container">
        <h2>Accounts</h2>
        <div v-for="account in store.accounts" :key="account.id" class="card mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ account.accountType }} - {{ account.IBAN }}</h5>
                <p class="card-text">Balance: {{ account.balance }}</p>
                <button class="btn btn-success mr-2" @click="showDepositModal(account)">Deposit</button>
                <button class="btn btn-danger" @click="showWithdrawModal(account)">Withdraw</button>
            </div>
        </div>

        <!-- Deposit Modal -->
        <div class="modal fade" id="depositModal" tabindex="-1" aria-labelledby="depositModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="depositModalLabel">Deposit to {{ currentAccount.IBAN }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="handleDeposit">
                            <div class="mb-3">
                                <label for="depositAmount" class="form-label">Amount</label>
                                <input type="number" min="0" class="form-control" id="depositAmount" v-model.number="amount" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <!-- Withdraw Modal -->
        <div class="modal fade" id="withdrawModal" tabindex="-1" aria-labelledby="withdrawModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="withdrawModalLabel">Withdraw from {{ currentAccount.IBAN }}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="handleWithdraw">
                            <div class="mb-3">
                                <label for="withdrawAmount" class="form-label">Amount</label>
                                <input type="number" min="0" class="form-control" id="withdrawAmount" v-model.number="amount" required>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from '@/stores/customer.js';

export default {
    name: 'ATMInterface',
    data() {
        return {
            amount: 0,
            currentAccount: {},
            depositModal: null,
            withdrawModal: null,
        };
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods: {
        showDepositModal(account) {
            this.currentAccount = account;
            this.depositModal = new bootstrap.Modal(document.getElementById('depositModal'));
            this.depositModal.show();
        },
        async handleDeposit() {
            if (this.amount <= 0) {
                alert('Amount must be positive.');
                return;
            }
            await this.store.deposit(this.currentAccount.accountId, this.amount);
            this.depositModal.hide();
            this.amount = 0;
        },
        showWithdrawModal(account) {
            this.currentAccount = account;
            this.withdrawModal = new bootstrap.Modal(document.getElementById('withdrawModal'));
            this.withdrawModal.show();
        },
        async handleWithdraw() {
            if (this.amount <= 0) {
                alert('Amount must be positive.');
                return;
            }
            await this.store.withdraw(this.currentAccount.accountId, this.amount);
            this.withdrawModal.hide();
            this.amount = 0;
        },
    },
};
</script>
