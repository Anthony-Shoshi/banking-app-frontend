<template>
    <section>
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <div class="text-center">
                        <h1 class="welcome-text">FAFA Bank ATM</h1>
                        <img src="/atm.png" alt="ATM Image" class="rounded img-fluid" />
                    </div>
                </div>
                <div class="col-md-6 d-flex align-items-center justify-content-center">
                    <div class="login-form d-flex flex-column justify-content-center">
                        <h2 class="text-center"><strong>ATM Login</strong></h2>
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input v-model="email" id="email" type="email" class="form-control" required />
                                <div v-if="showEmailError" class="text-danger">Email is required</div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input v-model="password" type="password" class="form-control" id="password" required />
                                <div v-if="showPasswordError" class="text-danger">Password is required</div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
                            <div v-if="loginError" class="text-danger mt-3">{{ loginError }}</div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { useStore } from '@/stores/customer.js';

export default {
    name: 'ATMLogin',
    data() {
        return {
            email: '',
            password: '',
            loginError: null,
        };
    },
    setup() {
        const store = useStore();
        return { store };
    },
    methods: {
        async handleSubmit() {
            this.loginError = null;
            try {
                await this.store.login(this.email, this.password);
                this.$router.push('/atm');
            } catch (error) {
                this.loginError = error.message;
            }
        },
    },
};
</script>

<style scoped>
.welcome-text {
    margin-top: 10px;
    color: #60BFC1;
    font-size: 50px;
    font-weight: bold;
}

.login-form {
    background-color: #FFFFFF;
    padding: 40px;
    border-radius: 20px;
    width: 80%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.rounded {
    width: 80%;
}

.btn-primary {
    background-color: #60BFC1;
    color: #fff;
    font-weight: bold;
    border: none;
    width: 100%;
}

.btn-primary:hover {
    background-color: #3a7e80;
    color: #fff;
    border: none;
}
</style>
