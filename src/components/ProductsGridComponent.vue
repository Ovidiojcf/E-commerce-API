<script setup>
import ProductComponent from './ProductComponent.vue';
import { useGetProducts } from '@/stores/product';
import { onMounted, ref } from 'vue';

const allProducts = ref([]); //guardar todos os produtos
const store = useGetProducts(); // variavel auxiliar para consumir a função da store

function getImg(imagePath) {
    const baseUrl = 'http://34.138.111.33:8000' //base url da api
    return `${baseUrl}${imagePath}`
}

onMounted(async () => {
    console.log("1. Iniciando chamada à API");
    await store.getProductsStore();
    allProducts.value = store.products;
    console.log("Resposta da API:", allProducts);
})

</script>

<template>
    <section class="bg-white p-10">
        <div class="">
            <!-- Products grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 content-center gap-6 ">
                <ProductComponent v-for="product in allProducts" :key="product.id" :imageUrl="getImg(product.image_path)"
                    :name="product.name" :price="product.price" :description="product.description" />
            </div>
        </div>
    </section>
</template>
