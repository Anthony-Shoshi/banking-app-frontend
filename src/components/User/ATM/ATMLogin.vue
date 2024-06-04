<template>
    <div class="container">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
            <div class="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" v-model="email" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script>
import { useStore } from '@/stores/customer.js';

export default {
    name: 'ATMLogin',
    data() {
        return {
            email: '',
            password: '',
        };
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods: {
        async handleSubmit() {
            await this.store.login(this.email, this.password);
            this.$router.push('/atm');
        },
    },
};
</script>