<template>
  <header>
    <Navbar />
  </header>
  <div class="text-white m-10">
    <h5 class="text-xl font-bold dark:text-white">{{ game.title }}</h5>
    <iframe
      class="bg-white my-5"
      ref="gameFrame"
      width="1000"
      height="200"
      :src="game.path"
    ></iframe>
    <div class="" v-if="message !== ''">
      <p class="text-white">Ваш счет: {{ message }}</p>
      <button
        type="submit"
        @click="sendForm"
        class="focus:outline-none text-white bg-lime-700 hover:bg-lime-800 focus:ring-4 focus:bg-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-lime-800"
      >
        Опубликовать счет
      </button>
    </div>

    <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
      Top scores:
    </h2>
    <ol
      class="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400"
    >
      <li v-for="score in allScores" :key="score.username">
        <span
          :class="score.username == username ? 'font-bold' : ''"
          class="text-gray-900 dark:text-white"
          >{{ score.username }}</span
        >
        with
        <span class="font-semibold text-gray-900 dark:text-white">{{
          score.score
        }}</span>
        points
      </li>
    </ol>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "../components/Navbar.vue";
export default {
  components: { Navbar },
  created() {
    const slug = this.$route.params.slug;
    this.$store.dispatch("fetchGame", slug);
  },
  data() {
    return {
      message: "",
      messageData: 0,
      timerId: null,
    };
  },
  mounted() {
    let gameFrame = this.$refs.gameFrame;
    gameFrame.addEventListener("load", () => {
      window.addEventListener("message", (event) => {
        this.handleMessage(event);
      });
    });
    const slug = this.$route.params.slug;
    this.startTimer(); // Запуск таймера
    this.$store.dispatch("scores", slug);
  },
  beforeDestroy() {
    this.stopTimer();
  },

  methods: {
    handleMessage(event) {
      // Обрабатываем полученное сообщение
      this.messageData = event.data.score;
      this.message = Math.floor(this.messageData);
    },
    async sendForm() {
      const slug = this.$route.params.slug;
      await this.$store.dispatch("createScore", [slug, this.message]);
      await this.$store.dispatch("scores", slug);
    },
    startTimer() {
      this.timerId = setInterval(() => {
        const slug = this.$route.params.slug;
        this.$store.dispatch("scores", slug);
      }, 5000); // Обновление каждые 5 секунд (5000 миллисекунд)
    },

    stopTimer() {
      clearInterval(this.timerId);
      this.timerId = null;
    },
  },
  computed: {
    ...mapGetters(["game", "allScores", "username"]),
  },
};
</script>

<style>
</style>