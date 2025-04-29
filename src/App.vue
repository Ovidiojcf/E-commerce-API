<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useCreateCart } from '@/stores/cart.js';
import { useAuthStore } from '@/stores/auth.js';

const userStore = useAuthStore();
const cartStore = useCreateCart();

onMounted(() => {
  cartStore.initCart(userStore.token);
});
</script>

<template>
  <RouterView />
</template>

