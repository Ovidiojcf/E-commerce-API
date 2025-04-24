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
    <div
        class="flex flex-row w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden gap-6 p-6 text-center">
        <img :src="getImg(avatarUrl)" alt="Foto do usuário"
            class="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-gray-300" />
        <div class="flex flex-col justify-center items-start">
            <h2 class="text-xl !font-semibold text-gray-800 dark:text-white">{{ name }}</h2>
            <p class="text-gray-600 dark:text-gray-300">{{ email }}</p>
        </div>
    </div>
</template>
