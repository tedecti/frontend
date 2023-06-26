<template>
  <header>
    <Navbar />
  </header>
  <div class="text-white m-10">
    <h5 class="text-xl font-bold dark:text-white">{{ user.username }}</h5>
    <div v-if="user.authoredGames?.length" class="my-10">
      <div v-for="game in user.authoredGames" :key="game.slug">
        <router-link
          :to="'/games/' + game.slug + '/edit'"
          class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        > 
          <img
            v-if="game.thumbnail"
            class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            :src="game.thumbnail"
            alt="thumbnail"
          />
          <div class="flex flex-col justify-between p-4 leading-normal">
            <h5
              class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
            >
              {{ game.title }}
            </h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {{ game.description }}
            </p>
          </div>
        </router-link>
        <h5 class="text-xl font-bold dark:text-white">All user's top scores:</h5>
        <ol
          class="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
          v-for="scoreinfo in user.highscores"
          :key="scoreinfo.game"
        >
          <li>
            <span class="font-semibold text-gray-900 dark:text-white">{{
               scoreinfo.game.title
            }}</span>
            with
            <span class="font-semibold text-gray-900 dark:text-white">{{scoreinfo.score}}</span>
            points
          </li>
        </ol>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
  computed: {
    ...mapGetters(["game", "allScores", "username", "user"]),
  },
  async mounted() {
    await this.$store.dispatch("fetchUser", this.username);
  },
};
</script>

<style>
</style>