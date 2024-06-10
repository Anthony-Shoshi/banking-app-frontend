<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="text-center">
            <h1 class="welcome-text">Welcome to FAFA Bank</h1>
            <img src="../assets/images/banking.png" alt="Bank Image" class="rounded img-fluid" />
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center justify-content-center">
          <div class="login-form d-flex flex-column justify-content-center">
            <h2 class="text-center"><strong>Login</strong></h2>
            <form @submit.prevent="validateLogin">
              <div class="mb-3">
                <label for="inputUsername" class="form-label">Username</label>
                <input v-model="username" id="inputUsername" type="text" class="form-control" required />
                <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
              </div>
              <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input v-model="password" id="inputPassword" type="password" class="form-control" required />
                <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
              </div>
              <button type="submit" class="btn btn-primary btn-lg btn-block">Login</button>
              <router-link to="/register" class="btn btn-link btn-lg btn-block">Don't have an account? Register!</router-link>
              <div v-if="errors.other" class="text-danger mt-3">{{ errors.other }}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useUserStore } from '@/stores/User';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      errors: {
        username: null,
        password: null,
        other: null
      }
    };
  },
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    return { router, userStore };
  },
  methods: {
    async validateLogin() {
      this.clearErrors();
      if (!this.username.trim()) {
        this.errors.username = 'Username is required';
      }
      if (!this.password.trim()) {
        this.errors.password = 'Password is required';
      }
      if (this.errors.username || this.errors.password) {
        return;  // Stop the login process if there are validation errors
      }
      try {
        const result = await this.userStore.login({ username: this.username, password: this.password });
        if (result.success) {
          await this.router.push(this.getRedirectRoute(result.user.role));
          nextTick(() => {
            window.location.reload();
          });
        } else {
          this.errors.other = "Login failed. Please check your username and password and try again.";
        }
      } catch (error) {
        console.error("Login Error:", error);
        this.errors.other = "Network or server error. Please try again later.";
      }
    },
    getRedirectRoute(role) {
      switch(role) {
        case 'ROLE_EMPLOYEE': return '/employeeView';
        case 'ROLE_CUSTOMER': return '/customerDashboard';
        default: return '/';
      }
    },
    clearErrors() {
      this.errors = { username: null, password: null, other: null };
    }
  }
};
</script>


<style scoped>
.welcome-text {
  color: #60BFC1;
  font-size: 100px;
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
