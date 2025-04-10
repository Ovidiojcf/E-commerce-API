<script setup>
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useCreateCart } from '@/stores/cart';

const cartStore = useCreateCart();

onMounted(() => {
  cartStore.initCart();
});
</script>

<template>
  <RouterView />
</template>

