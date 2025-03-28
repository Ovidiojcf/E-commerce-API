<script setup>
import { defineProps } from 'vue';


defineProps({
    imageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: [Number, String],
        required: true
    },
    description: {
        type: String,
        required: true,
        default: null,
    }
});

</script>

<template>
    <div
        class="max-w-sm gap-4 p-6  bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-xl" :src="imageUrl" :alt="name">
        <h5 class="mb-2 font-sans text-2xl !font-bold text-black">{{ name }}</h5>
        <h3 class="mb-2 text-xl !font-semibold  text-black py-2">$ {{ price }}</h3>
        <p class="mb-3 font-normal text-black text-justify">{{ description }}</p>
    </div>
</template>
