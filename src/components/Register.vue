<template>
  <section>
    <div class="container">
      <WaitingApproval v-if="showSuccessMessage" :userInfo="userInfo"/>
      <div v-else>
        <div class="row">
          <div class="col-md-12">
            <h1 class="text-center welcome-text">Register New Customer</h1>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="registerCustomer" class="mt-4">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="inputGender" class="form-label form-text-lg">Gender</label>
                <select v-model="gender" id="inputGender" class="form-select" required>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </div>
              <div class="col-md-6">
                <label for="inputAccountType" class="form-label form-text-lg">Account Type</label>
                <select v-model="accountType" id="inputAccountType" class="form-select" required>
                  <option value="saving">Saving</option>
                  <option value="current">Current</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="inputFirstName" class="form-label form-text-lg">First Name</label>
                <input v-model="firstName" id="inputFirstName" type="text" class="form-control" required/>
              </div>
              <div class="col-md-6">
                <label for="inputLastName" class="form-label form-text-lg">Last Name</label>
                <input v-model="lastName" id="inputLastName" type="text" class="form-control" required/>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="inputEmail" class="form-label form-text-lg">Email</label>
                <input v-model="email" id="inputEmail" type="email" class="form-control" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"/>
              </div>
              <div class="col-md-6">
                <DOBPicker />
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="inputPassword" class="form-label form-text-lg">Password</label>
                <input v-model="password" @input="showPasswordFormat" type="password" class="form-control" id="inputPassword" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"/>
              </div>
              <div class="col-md-6">
                <label for="inputConfirmPassword" class="form-label form-text-lg">Confirm Password</label>
                <input v-model="confirmPassword" type="password" class="form-control" id="inputConfirmPassword" required @input="checkPasswordMatch"/>
                <div v-if="confirmPassword && password !== confirmPassword" class="text-danger">Passwords do not match</div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="inputBsn" class="form-label form-text-lg">BSN Number</label>
                <input v-model="bsn" id="inputBsn" type="text" class="form-control" required pattern="\d{9}" maxlength="9"/>
                <div class="form-text text-dark">BSN number must be exactly 9 digits long.</div>
              </div>
              <div class="col-md-6">
                <label for="inputPhoneNumber" class="form-label form-text-lg">Phone Number</label>
                <input v-model="phoneNumber" id="inputPhoneNumber" type="text" class="form-control" required pattern="\d{9}" maxlength="9"/>
                <div class="form-text text-dark">Phone number must be exactly 9 digits long.</div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg btn-block">Register</button>
          </form>
          <button class="btn btn-secondary btn-lg btn-block" @click="returnToLogin">Return to Login</button>
        </div>
      </div>
      </div>
    </div>
  </section>
</template>

<script>
import DOBPicker from '@/components/DatePicker.vue';
import WaitingApproval from '@/components/WaitingApproval.vue';

export default {
  name: 'RegisterCustomer',
  components: {
    DOBPicker,
    WaitingApproval,
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      bsn: '',
      phoneNumber: '',
      gender: '',
      accountType: '',
      showSuccessMessage: false,

      userInfo: {} // Initialize userInfo here

    };
  },
  methods: {
    registerCustomer() {

      // Set showSuccessMessage to true to display success message
      this.showSuccessMessage = true;

      // Push the route with userInfo as a parameter
      this.$router.push({
        name: 'WaitingApproval',
        params: {
          userInfo: {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            bsn: this.bsn,
            phoneNumber: this.phoneNumber,
            gender: this.gender,
            accountType: this.accountType
          }
        }
      });


      // Clear form fields after pushing the route
      this.clearFields();
    },
    returnToLogin() {
      this.$router.push('/login');
    },
    clearFields() {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.bsn = '';
      this.phoneNumber = '';
      this.gender = '';
    },
  },
};
</script>

<style scoped>
.welcome-text {
  font-weight: bold;
  color: #000;
  font-size: 45px;
  margin-top: 50px;
}

.form-text-lg {
  font-size: 18px;
}

.btn-primary {
  margin-top:  10px;
  margin-bottom: 10px;
  background-color: #000000;
  color: #fff;
  font-weight: bold;
  border: none;
}

.btn-primary:hover {
  background-color: #ffffff;
  color: #000000;
  border: none;
}

.btn-secondary {
  margin-top:  10px;
  margin-bottom: 10px;
  background-color: #000000;
  color: #fff;
  font-weight: bold;
  border: none;
}

.btn-secondary:hover {
  background-color: #ffffff;
  color: #000000;
  border: none;
}

.success-message{
  font-size: 18px;
}
</style>