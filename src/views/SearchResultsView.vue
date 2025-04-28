<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useGetProducts } from '@/stores/product';
import ProductComponent from '@/components/ProductComponent.vue';
import Header from '@/components/HeaderComponent.vue';
import Fuse from 'fuse.js'; // Importando Fuse.js para busca avançada


const route = useRoute();
const store = useGetProducts();
const searchResults = ref([]);
const fuse = ref(null); // Inicializando o Fuse.js


// Função para pegar a imagem
function getImg(imagePath) {
    if (!imagePath) {
        return '/placeholder.svg';
    }
    const baseUrl = 'http://35.196.79.227:8000';
    return imagePath.startsWith('/') ? `${baseUrl}${imagePath}` : `${baseUrl}/${imagePath}`;
}

// Função para buscar produtos
const performSearch = () => {
    const query = route.params.query || '';

    if (!query.trim()) {
        searchResults.value = [];
        return;
    }

    if (!fuse.value) {
        searchResults.value = [];
        return;
    }

    const results = fuse.value.search(query);
    searchResults.value = results.map(result => result.item);
};

// Atualiza o Fuse se os produtos mudarem
watch(
  () => store.products,
  (newProducts) => {
    fuse.value = new Fuse(newProducts, {
      keys: ['name'],
      threshold: 0.4,
    });
    performSearch(); // pra atualizar a lista após carregar produtos novos
  }
);

// Reexecuta a busca se mudar o termo na rota
watch(
  () => route.params.query,
  () => {
    performSearch();
  }
);

onMounted(async () => {
    if (store.products.length === 0) {
        await store.getProductsStore();
    }

    fuse.value = new Fuse(store.products, {
        keys: ['name'],
        threshold: 0.4,
    });

    performSearch();
});
</script>

<template>
    <Header></Header>
    <section class="bg-white p-6 min-h-screen">
        <h1 class="text-2xl font-bold !mb-6">Resultados para "{{ route.params.query }}"</h1>

        <div v-if="searchResults.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductComponent v-for="product in searchResults" :key="product.id" :id="product.id" :name="product.name"
                :price="product.price" :imageUrl="getImg(product.image_path)" />
        </div>

        <div v-else class="text-gray-500 text-center">
            Nenhum produto encontrado.
        </div>
    </section>
</template>
