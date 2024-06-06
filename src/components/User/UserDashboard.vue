<template>
  <div class="d-flex">
    <nav id="sidebar" class="bg-light border-right">
      <div class="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <ul class="list-unstyled components">
        <li>
          <router-link to="/customerDashboard">Home</router-link>
        </li>
        <li>
          <router-link to="/transaction-history">Transaction History</router-link>
        </li>
      </ul>
    </nav>

    <div id="content" class="p-4 p-md-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerDashboard"
};
</script>

<style>
.d-flex {
  display: flex;
}

#sidebar {
  width: 250px;
}

#content {
  width: calc(100% - 250px);
}
</style>
