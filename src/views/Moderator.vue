<script setup>
import PostProducts from '@/components/PostProducts.vue';
import Header from '@/components/HeaderComponent.vue';
import PostCategories from '@/components/PostCategories.vue';
import { ref } from 'vue';

// Estado da aba ativa
const activeTab = ref(1);

// Lista de abas
const tabs = [
    { id: 1, label: "Product" },
    { id: 2, label: "Category" },
    { id: 3, label: "Discount" }
];
</script>

<template>
    <main>
        <Header></Header>
        <!--Tabs Here-->
        <div class="flex border-b">
            <button v-for="tab in tabs" key="tab.id" @click="activeTab = tab.id"
                class="flex-1 py-2 text-center border-b-2 transition-colors duration-300"
                :class="activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700'">
                {{ tab.label }}
            </button>
        </div>

        <!-- Content for each tab-->
        <div class="p-4">
            <div v-if="activeTab === 1">
                <PostProducts />
            </div>
            <div v-if="activeTab === 2">
                <PostCategories />
            </div>
            <div v-if="activeTab === 3">

            </div>
        </div>
    </main>
</template>