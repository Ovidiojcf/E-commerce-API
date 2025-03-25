<script setup>
import CartItemComponent from '@/components/CartItemComponent.vue';
import { ref } from 'vue';

const cartItem = ref(true);

</script>
<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl !font-bold mb-6">Seu Carrinho</h1>

        <div v-if="cartItem">
            <div class="mb-4 pb-4 border-b">
                <h2 class="text-lg font-semibold">Itens do Carrinho ( {{ }} )</h2>
            </div>
            <CartItemComponent />
        </div>

        <div v-else="!cartItem" class="flex flex-col justify-content items-center text-center gap-4 py-12">
            <h2 class="text-xl !font-semibold mb-4">Seu carrinho está vazio</h2>
            <p class="text-gray-400">Adicione produtos ao seu carrinho</p>
            <router-link to="/"
                class="w-64 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Continuar Comprando
            </router-link>
        </div>
    </div>
</template>