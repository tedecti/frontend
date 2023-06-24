<template>
  <Navbar />
  <div>
    <h4 class="text-2xl font-bold dark:text-white">Games</h4>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    Navbar,
  },
  mounted() {
    this.$store.dispatch("fetchGames");
  },
  computed:{
    ...mapGetters(['allGames'])
  }
};
</script>
