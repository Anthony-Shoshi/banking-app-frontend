<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div class="container-fluid">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active"
            >Dashboard</router-link
          >
        </li>      
        <li class="nav-item">
          <router-link to="/products" class="nav-link" active-class="active"
            >Products</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/adminlogin" class="nav-link" active-class="active"
            >Admin Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link" active-class="active"
            >Login</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/transactions" class="nav-link" active-class="active"
            >Transactions</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/card" class="nav-link" active-class="active"
            >Card</router-link
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style>
</style>