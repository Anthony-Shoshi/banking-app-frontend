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
            <form>
              <div class="mb-3">
                <label for="inputUsername" class="form-label">Username</label>
                <input v-model="username" id="inputUsername" type="text" class="form-control" />
              </div>
              <div class="mb-3">
                <label for="inputPassword" class="form-label">Password</label>
                <input v-model="password" type="password" class="form-control" id="inputPassword" />
              </div>
              <button type='button' @click="login" class="btn btn-primary btn-lg btn-block">Login</button>
              <a href="/register" class="btn btn-link btn-lg btn-block">Register</a>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="euro-sign">€</div>
    <div class="euro-sign">€</div>
    <div class="euro-sign">€</div>
    <div class="euro-sign">€</div>
    <div class="euro-sign">€</div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
    }
  }
};
</script>

<style scoped>

.welcome-text {
  color: #F7E3DB;
  font-size: 70px;
}

.login-form {
  background-color: #FFFFFF;
  padding: 40px;
  border-radius: 20px;
  width: 80%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 80%;
}

.rounded {
  border-radius: 20px;
}

.euro-sign {
  position: absolute;
  font-size: 24px;
  color: #F7E3DB;
}

.euro-sign:nth-child(1) {
  animation: moveEuro1 5s linear infinite;
}

.euro-sign:nth-child(2) {
  animation: moveEuro2 4s linear infinite;
}

.euro-sign:nth-child(3) {
  animation: moveEuro3 6s linear infinite;
}

.euro-sign:nth-child(4) {
  animation: moveEuro4 3s linear infinite;
}

.euro-sign:nth-child(5) {
  animation: moveEuro5 7s linear infinite;
}

@keyframes moveEuro1 {
  0% {
    top: 0;
    left: 0;
  }
  50% {
    top: 100%;
    left: 100%;
  }
  100% {
    top: 0;
    left: 0;
  }
}

@keyframes moveEuro2 {
  0% {
    top: 100%;
    left: 100%;
  }
  50% {
    top: 0;
    left: 0;
  }
  100% {
    top: 100%;
    left: 100%;
  }
}

@keyframes moveEuro3 {
  0% {
    top: 50%;
    left: 50%;
  }
  50% {
    top: 0;
    left: 100%;
  }
  100% {
    top: 50%;
    left: 50%;
  }
}

@keyframes moveEuro4 {
  0% {
    top: 0;
    left: 100%;
  }
  50% {
    top: 100%;
    left: 0;
  }
  100% {
    top: 0;
    left: 100%;
  }
}

@keyframes moveEuro5 {
  0% {
    top: 100%;
    left: 0;
  }
  50% {
    top: 0;
    left: 100%;
  }
  100% {
    top: 100%;
    left: 0;
  }
}
</style>
