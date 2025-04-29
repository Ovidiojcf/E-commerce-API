<script setup>
import Header from '@/components/HeaderComponent.vue'
import ProductComponent from '@/components/ProductComponent.vue'
import { useFavoritesStore } from '@/stores/favorites'
import { computed } from 'vue';

const favoritesStore = useFavoritesStore()
const favorites = computed(() => favoritesStore.favorites)

</script>

<template>
    <Header />

    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl font-bold mb-6">Meus Favoritos</h1>

        <div v-if="favorites.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div v-for="product in favorites" :key="product.id" class="relative">
                <!-- Reuso do ProductComponent -->
                <ProductComponent :id="product.id" :name="product.name" :price="product.price"
                    :imageUrl="product.imageUrl" />
            </div>
        </div>

        <p v-else class="text-center text-gray-500">
            No favorite products yet
        </p>
    </div>
</template>
