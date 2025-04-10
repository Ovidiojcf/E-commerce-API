<script setup>
import { defineProps } from 'vue';
import { useCreateCart } from '@/stores/cart';

const cartStore = useCreateCart();

const props = defineProps({
  id: Number,
  name: String,
  price: [Number, String],
  imageUrl: String
});

function handleAddToCart() {
  cartStore.addToCart({
    productId: props.id,
    quantity: 1,
    unitPrice: props.price
  });
}
</script>

<template>
    <div
        class="w-full gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <img class="rounded-xl" :src="imageUrl" :alt="name">
        <h5 class="mb-2 font-sans text-2xl !font-bold text-black">{{ name }}</h5>
        <h3 class="mb-2 text-xl !font-semibold  text-black py-2">R$ {{ price }}</h3>
        <!-- <p class="mb-3 font-normal text-black text-justify">{{ description }}</p> -->
        <button @click="handleAddToCart" class="w-auto h-auto flex justify-center text-lg rounded-md
            bg-indigo-600 px-3 py-3 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Adicionar
        </button>
    </div>
</template>
