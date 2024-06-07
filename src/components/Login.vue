<template>
    <div class="container-fluid">
        <div class="row">
            <div
                class="col-md-6 d-flex align-items-center justify-content-center"
            >
                <div class="text-center">
                    <h1 class="welcome-text">Welcome to FAFA Bank</h1>
                    <img
                        src="../assets/images/banking.png"
                        alt="Bank Image"
                        class="rounded img-fluid"
                    />
                </div>
            </div>
            <div
                class="col-md-6 d-flex align-items-center justify-content-center"
            >
                <div
                    class="login-form d-flex flex-column justify-content-center"
                >
                    <h2 class="text-center"><strong>Login</strong></h2>
                    <form @submit.prevent="validateLogin">
                        <div class="mb-3">
                            <label for="inputUsername" class="form-label"
                                >Username</label
                            >
                            <input
                                v-model="username"
                                id="inputUsername"
                                type="text"
                                class="form-control"
                                required
                            />
                            <div v-if="showUsernameError" class="text-danger">
                                Username is required
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="inputPassword" class="form-label"
                                >Password</label
                            >
                            <input
                                v-model="password"
                                type="password"
                                class="form-control"
                                id="inputPassword"
                                required
                            />
                            <div v-if="showPasswordError" class="text-danger">
                                Password is required
                            </div>
                        </div>
                        <button
                            type="submit"
                            class="btn btn-primary btn-lg btn-block"
                        >
                            Login
                        </button>
                        <a
                            href="/register"
                            class="btn btn-link btn-lg btn-block"
                            >Don't have an account? Register!</a
                        >
                        <div v-if="loginError" class="text-danger mt-3">
                            {{ loginError }}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            showUsernameError: false,
            showPasswordError: false,
            loginError: null,
        };
    },
    methods: {
        validateLogin() {
            this.showUsernameError = this.username === "";
            this.showPasswordError = this.password === "";
            if (!this.showUsernameError && !this.showPasswordError) {
                this.fetchLogin();
            }
        },
        async fetchLogin() {
            try {
                const response = await axios.post(
                    "http://localhost:8080/login",
                    {
                        email: this.username,
                        password: this.password,
                    }
                );
                const { email, token } = response.data;
                localStorage.setItem("token", token);

                const loginResult = await this.$store.dispatch("login", {
                    token,
                });

                if (loginResult.success) {
                    const user = this.$store.state.user;
                    if (user.role === "ROLE_EMPLOYEE") {
                        this.$router.push("/employeeView");
                    } else if (user.role === "ROLE_CUSTOMER") {
                        this.$router.push("/customerDashboard");
                    } else {
                        this.$router.push("/");
                    }
                } else {
                    this.loginError = loginResult.message;
                }
            } catch (error) {
                console.error(
                    "There was a problem with the Axios request:",
                    error
                );
                if (error.response && error.response.status === 401) {
                    this.loginError = error.response.data;
                } else {
                    this.loginError =
                        "Login failed. Please check your credentials and try again."; // Default error message
                }
            }
        },
    },
};
</script>

<style scoped>
.welcome-text {
    color: #60bfc1;
    font-size: 100px;
    font-weight: bold;
}

.login-form {
    background-color: #ffffff;
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
    background-color: #60bfc1;
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
