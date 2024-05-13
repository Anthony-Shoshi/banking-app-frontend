<template>
  <section>
    <div class="container">
      <h2 class="welcome-text mt-3 mt-lg-4">Welcome to the FAFA bank</h2>

      <div class="row mt-5  ">
        <div class="col-md-3">
          <div class="card register-box">
            <div class="card-body">
              <h5 class="card-title" style="font-family: monospace; color: #3a7e80; font-size: 40px; font-weight:bold; ">Become a member of FAFA community, </h5>
              <p class="card-text"> Create an account in FAFA Bank!</p>
              <router-link to="/register" class="btn btn-primary">Register</router-link>
            </div>
          </div>
        </div>

        <div class="col-md-9">
          <div class="card what-we-offer-box">
            <div class="card-body">
              <h2 class="card-title"><strong>What do we offer?</strong></h2>
              <div class="row">
                <div class="col-sm-6">
                  <h3><strong>Saving Account</strong></h3>
                  <div class="image-container">
                    <img src="../assets/images/saving.jpg" alt="Saving Account Image" class="rounded img-fluid" style="width: 100%;">
                    <div class="text-box rounded" style="background-color: #60BFC1;">
                      <p>Opening a saving account with us provides you with a suite of features designed to streamline your day-to-day banking activities. Enjoy benefits such as unlimited transactions, overdraft facilities, and personalized cheque books, empowering you to manage your finances efficiently.</p>
                    </div>
                  </div>
                </div>

                <div class="col-sm-6">
                  <h3><strong>Current Account</strong></h3>
                  <div class="image-container">
                    <img src="../assets/images/saving.jpg" alt="Saving Account Image" class="rounded img-fluid" style="width: 100%;">
                    <div class="text-box rounded" style="background-color: #60BFC1;">
                      <p>Opening a current account with us provides you with a suite of features designed to streamline your day-to-day banking activities. Enjoy benefits such as unlimited transactions, overdraft facilities, and personalized cheque books, empowering you to manage your finances efficiently.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row mt-5 justify-content-center">
        <div class="col-md-6 text-center login-box">
          <p>Already have an account? <router-link to="/login">Login</router-link></p>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>

.welcome-text {
  color: #60BFC1;
  font-size: 80px;
  font-weight: bold;
  text-align: center;
}

.register-box {
  border-radius: 10px;
  height: 100%;
  font-size: 20px;
  font-family: monospace;
}

.what-we-offer-box {
  border-radius: 10px;
}

.register-box .card-body {
  text-align: center;
}

.what-we-offer-box .card-body {
  text-align: center;
}

.btn-primary {
  background-color: #60BFC1;
  font-size: 25px;
}

.btn-primary:hover {
  background-color: #3a7e80;
}

.login-box {
  background-color: #ffffff;
  font-size: 30px;
  padding: 20px;
  border-radius: 10px;
  height: auto;
}

.image-container {
  position: relative;
  overflow: hidden;
}

.text-box {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  color: white;
}
</style>
