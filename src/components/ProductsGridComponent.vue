<script setup>
import ProductComponent from './ProductComponent.vue';
import { useGetProducts } from '@/stores/product';
import { onMounted, ref } from 'vue';

const allProducts = ref([]); //guardar todos os produtos
const store = useGetProducts(); // variavel auxiliar para consumir a função da store

function getImg(imagePath) {
    // Verificar se imagePath existe
    if (!imagePath) {
        return '/placeholder.svg'; // Imagem padrão
    }
    
    const baseUrl = 'http://35.196.79.227:8000'; // Removi a barra no final
    
    // Se o caminho já começar com /, não adicionar outra barra
    if (imagePath.startsWith('/')) {
        return `${baseUrl}${imagePath}`;
    } else {
        return `${baseUrl}/${imagePath}`;
    }
}

onMounted(async () => {
    console.log("1. Iniciando chamada à API");
    await store.getProductsStore();
    allProducts.value = store.products;
    console.log("Resposta da API:", allProducts);
})

</script>

<template>
    <section class="bg-white p-6">
        <div class="">
            <!-- Products grid -->
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 content-center gap-6 ">
                <ProductComponent 
                    v-for="product in allProducts" 
                    :key="product.id"
                    :id="product.id"
                    :imageUrl="getImg(product.image_path)"
                    :name="product.name" 
                    :price="product.price"
                     />
                     <!--:description="product.description" devolver para o componente quando necessário-->
            </div>
        </div>
    </section>
</template>
