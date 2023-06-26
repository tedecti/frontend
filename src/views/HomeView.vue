<template>
  <header>
    <Navbar />
  </header>
  <div class="mx-20 flex flex-wrap items-center justify-between mx-auto p-4">
    <h1
      class="self-center text-2xl font-semibold whitespace-nowrap text-2xl font-semibold dark:text-white"
    >
      {{ allGames.totalElements }} Games avaialable
    </h1>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <button
        type="button"
        @click="sortPopular"
        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Popularity
      </button>
      <button
        type="button"
        @click="sortUpload"
        class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Recently Updated
      </button>
      <button
        type="button"
        @click="sortTitle"
        class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        Alphabetically
      </button>
      <button
        type="button"
        @click="sortDir"
        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      >
        🠕🠗
      </button>
    </div>
  </div>
  <div class="flex flex-col gap-10">
    <Card
      v-for="data in allGames.content"
      :key="data.id"
      :title="data.title"
      :description="data.description"
      :slug="data.slug"
      :thumbnail="data.thumbnail"
      :scores="data.scoreCount"
    />
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Card from "../components/Card.vue";
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  components: {
    Navbar,
    Card,
  },
  created() {
    this.$store.commit("setSortingFromLocalStorage");
    this.$store.dispatch("fetchGames");
  },
  computed: {
    ...mapGetters(["allGames"]),
  },
  methods: {
    sortTitle() {
      this.$store.dispatch("sortTitle");
    },
    sortPopular() {
      this.$store.dispatch("sortPopular");
    },
    sortUpload() {
      this.$store.dispatch("sortUpload");
    },
    sortDir() {
      if (this.$store.state.isFiltered == 0) {
        this.$store.state.isFiltered = 1;
      } else {
        this.$store.state.isFiltered = 0;
      }
      this.$store.dispatch("sortDir");
    },
  },
};
</script>
