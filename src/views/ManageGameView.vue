<template>
  <header>
    <Navbar />
  </header>
  <div class="h-96 flex flex-col items-center justify-center">
    <div
      class="flex w-full md:max-w-2xl bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800"
    >
      <img
        v-if="game.thumbnail"
        class="object-cover w-48 h-96 md:h-auto md:w-48 md:rounded-l-lg"
        :src="game.thumbnail"
        alt="thumbnail"
      />
      <div class="flex flex-col justify-between p-4 leading-normal">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          <div class="mb-6">
            <label
              for="default-input"
              class="mb-3 text-sm font-medium text-gray-900 dark:text-white"
              >Change name and description</label
            >
            <input
              type="text"
              :value="game.title"
              @input="titleInput = $event.target.value"
              id="default-input"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Title..."
              required
            />
          </div>
        </h5>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <input
            type="text"
            :value="game.description"
            @input="descriptionInput = $event.target.value"
            id="large-input"
            class="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description..."
            required
          />
        </p>
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          for="file_input"
          >Upload new version</label
        >
        <input
          @change="uploadVersion"
          class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
        /><br />
        <div class="flex">
          <router-link to="/games">
            <button
              type="button"
              @click="updateInfo"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Change
            </button>
          </router-link>
          <button
            type="button"
            @click="showConfirmation = true"
            class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            Delete
          </button>
          <router-link to="/games">
            <button
              v-if="showConfirmation"
              type="button"
              @click="deleteGame"
              class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            >
              I'm sure, I want to delete
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
  

<script>
import { mapGetters } from "vuex";
import { api } from "./../api/index";
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
  computed: {
    ...mapGetters(["game", "allScores", "username", "user", "authData"]),
  },
  data() {
    return {
      titleInput: "",
      descriptionInput: "",
      showConfirmation: false,
    };
  },
  async mounted() {
    await this.$store.dispatch("fetchGame", this.$route.params.slug);
  },
  methods: {
    async uploadVersion(event) {
      const file = event.target.files[0];
      const data = new FormData();
      data.append("zipfile", file);
      const token = {
        headers: {
          Authorization: `Bearer ${this.authData.token}`,
        },
      };
      await api
        .post(`/games/${this.$route.params.slug}/upload`, data, token)
        .then((response) => {
          this.$store.dispatch("fetchGame", this.$route.params.slug);
        });
    },
    updateInfo() {
      const gameData = {
        title: this.titleInput,
        description: this.descriptionInput,
      };
      console.log(this.titleInput);
      this.$store.dispatch("updateGame", [this.$route.params.slug, gameData]);
    },
    deleteGame() {
      this.$store.dispatch("deleteGame", this.$route.params.slug).then(() => {
        this.showConfirmation = false;
      });
    },
  },
};
</script>

<style>
</style>