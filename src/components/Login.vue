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
                <input v-model="username" id="inputUsername" type="text" class="form-control" required/>
                <div v-if="showUsernameError" class="text-danger">Username is required</div>
              </div>
              <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="inputPassword" required/>
                <div v-if="showPasswordError" class="text-danger">Password is required</div>
              </div>
              <button type='submit' class="btn btn-primary btn-lg btn-block">Login</button>
              <a href="/register" class="btn btn-link btn-lg btn-block">Don't have an account? Register!</a>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      showUsernameError: false,
      showPasswordError: false
    };
  },
  methods: {
    validateLogin() {
      this.showUsernameError = this.username === "";
      this.showPasswordError = this.password === "";
      if (!this.showUsernameError && !this.showPasswordError) {
        // Perform login action
      }
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

.btn-primary{
  background-color: #60BFC1;
  color: #fff;
  font-weight: bold;
  border: none;
  width: 100%;
}

.btn-primary:hover{
  background-color: #3a7e80;
  color: #fff;
  border: none;
}
</style>
