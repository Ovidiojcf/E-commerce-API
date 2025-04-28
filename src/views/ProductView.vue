<script setup>
import { ref, onMounted } from 'vue';
import { getProductById } from '@/services/HttpService'; 
import { useRoute } from 'vue-router';

const route = useRoute();
const product = ref(null);

onMounted(async () => {
    try {
        const productId = route.params.id;
        product.value = await getProductById(productId);
    } catch (error) {
        console.error('Erro ao carregar produto', error);
    }
});
</script>

<template>
    <div v-if="product" class="max-w-4xl mx-auto py-10">
        <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
        <img :src="product.image" alt="Product Image" class="mb-4 max-h-96 object-cover">
        <p class="text-gray-700 mb-2">{{ product.description }}</p>
        <p class="text-lg font-semibold">Preço: R$ {{ product.price }}</p>
    </div>
    <div v-else class="text-center py-20">
        <p class="text-gray-500">Carregando produto...</p>
    </div>
</template>
