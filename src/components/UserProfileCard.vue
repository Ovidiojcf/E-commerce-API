<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: String,
  email: String,
  avatarUrl: String
})

function getImg(imagePath) {
  const baseUrl = 'http://35.196.79.227:8000';
  return `${baseUrl}${imagePath}`;
}

</script>

<template>
  <div class="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 text-center">
    <img
      :src="getImg(avatarUrl)"
      alt="Foto do usuário"
      class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-300"
    />
    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ name }}</h2>
    <p class="text-gray-600 dark:text-gray-300">{{ email }}</p>
  </div>
</template>
