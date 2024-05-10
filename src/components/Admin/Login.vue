<template>
  <section>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <h1 class="text-center welcome-text">Welcome to FAFA Bank - Admin Portal</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="register-form d-flex flex-column align-items-center justify-content-center">
            <h2 class="register-text text-center"><strong>Register New Employee!</strong></h2>
            <a href="/adminregister" class="btn btn-primary btn-lg register">Register</a>
          </div>
        </div>
        <div class="col-md-6">
          <div class="login-form d-flex flex-column justify-content-center align-items-center">
            <h2 class="text-center"><strong>Login</strong></h2>
            <form @submit.prevent="validateLogin" class="mt-4">
              <div class="mb-3">
                <label for="inputUsername" class="form-label">Username</label>
                <input v-model="username" id="inputUsername" type="text" class="form-control" style="width: 300px;" required/>
                <div v-if="showUsernameError" class="text-danger">Username is required</div>
              </div>
              <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="inputPassword" required/>
                <div v-if="showPasswordError" class="text-danger">Password is required</div>
              </div>
              <button type='submit' class="btn btn-primary btn-lg login">Login</button>
            </form>
          </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AdminLogin",
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
  color: #F7E3DB;
  font-size: 60px;
  margin-top: 50px;
}

.register-text {
  color: #000;
  font-size: 70px;
  margin-top: 50px;
}

.login-form {
  background-color: #FFFFFF;
  padding: 40px;
  border-radius: 20px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
}

.rounded {
  width: 80%;
}

.login {
  margin-top: 20px;
  background-color: #60BFC1;
  color: #fff;
  font-weight: bold;
  border: none;
  width: 100%;
}

.login:hover {
  background-color: #3a7e80;
  color: #fff;
  border: none;
}

.register {
  margin-top: 30px;
  font-size: 30px;
  background-color: #000000;
  color: #fff;
  font-weight: bold;
  border: none;
  width: 40%;
  justify-content: center;
}

.register:hover {
  background-color: #ffffff;
  color: #000000;
  border: none;
}
</style>

