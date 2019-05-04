<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>

<script>
  module.exports = {
    created() {
      this.$router.push("login");
    }
  }
</script>
