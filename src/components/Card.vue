<template>
  <div
    class="flex mx-20 p-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="p-5">
      <div v-if="thumbnail">
        <img class="w-1/3" :src=thumbnail alt="thumbnail" />
      </div>
      <router-link :to="'games/' + slug">
        <h5
          class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
        >
          {{ title }}
        </h5>
      </router-link>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {{ description }}
      </p>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        #scores submitted: {{ scores }}
      </p>

    </div>
  </div>
</template>
<script>
export default {
  props: {
    thumbnail: String,
    title: String,
    description: String,
    slug: String,
    scores: String,
  },
};
</script>