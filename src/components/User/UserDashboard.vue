<template>
  <div class="d-flex">
    <nav id="sidebar" class="bg-light border-right p-3">
      <div class="sidebar-header mb-4">
        <h3>Dashboard</h3>
      </div>
      <ul class="list-unstyled">
        <li class="mb-2">
          <router-link to="/customerDashboard" class="nav-link">Home</router-link>
        </li>
        <li class="mb-2">
          <router-link to="/transaction-history" class="nav-link">Transaction History</router-link>
        </li>
        <li class="mb-2">
          <router-link to="/fund-transfer" class="nav-link">Transfer Other Customer</router-link>
        </li>
        <li class="mb-2">
          <router-link to="/fund-transfer-own" class="nav-link">Transfer Own Account</router-link>
        </li>
      </ul>
    </nav>

    <div id="content" class="p-4 p-md-5 flex-grow-1">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerDashboard"
};
</script>

<style scoped>
.d-flex {
  height: 100vh;
}

#sidebar {
  width: 250px;
}

#content {
  width: calc(100% - 250px);
}

.nav-link {
  color: #333;
  font-weight: bold;
  text-decoration: none;
}

.nav-link:hover {
  color: #0056b3;
}

.nav-link.active {
  color: #0056b3;
}

.bg-light {
  background-color: #f8f9fa !important;
}

.border-right {
  border-right: 1px solid #dee2e6 !important;
}
</style>
