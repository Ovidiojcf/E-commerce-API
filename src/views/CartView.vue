<script setup>
import CartItemComponent from '@/components/CartItemComponent.vue';
import { useCreateCart } from '@/stores/cart';
import { computed } from 'vue';

const cartStore = useCreateCart();
const cartItems = computed(() => cartStore.cartItems || []);
const cartHasItems = computed(() => cartItems.value.length > 0) // resultado para utilizar no v-if
const groupedItems = computed(() => groupCartItems(cartItems.value));

function groupCartItems(items) {
    const grouped = {};

    items.forEach(item => {
        if (!grouped[item.product_id]) {
            grouped[item.product_id] = {
                ...item,
                quantity: item.quantity,
                ids: [item.id], // salva os IDs diferentes se quiser usar depois
            };
        } else {
            grouped[item.product_id].quantity += item.quantity;
            grouped[item.product_id].ids.push(item.id);
        }
    });

    return Object.values(grouped);
}

function incrementItem(item) {
    cartStore.incrementItemQuantity(item.id); // Essa função precisa existir na store
}

function decrementItem(item) {
    cartStore.decrementItemQuantity(item.id); // Essa também
}
</script>
<template>
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl !font-bold mb-6">Seu Carrinho</h1>

        <div v-if="cartHasItems">
            <div class="mb-4 pb-4 border-b">
                <h2 class="text-lg font-semibold">Itens do Carrinho ({{ cartItems.length }})</h2>
            </div>
            <CartItemComponent 
                v-for="item in groupedItems" 
                :key="item.id" 
                :item="item" 
                @increment="incrementItem"
                @decrement="decrementItem" />


        </div>

        <div v-else class="flex flex-col justify-content items-center text-center gap-4 py-12">
            <h2 class="text-xl !font-semibold mb-4">Seu carrinho está vazio</h2>
            <p class="text-gray-400">Adicione produtos ao seu carrinho</p>
            <router-link to="/"
                class="w-64 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Continuar Comprando
            </router-link>
        </div>
    </div>
</template>