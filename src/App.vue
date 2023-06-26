<script>
export default {
  created() {
    this.$store.dispatch("authData");
    this.$store.dispatch("username");
  },
};
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>
</style>
