<script setup>
import FileDrop from './FileDrop.vue';
import { getImg } from '@/utils/image';
import { useCreateProducts } from '@/stores/product';
import { useGetProducts } from '@/stores/product';
import { onMounted, ref } from 'vue';




const products = useCreateProducts();
const store = useGetProducts();
const fileDropRef = ref(null);


async function sendProduct() {
    const result = await products.createProductForm();
    console.log(result);
    if (result) {
        alert('Produto Cadastrado com sucesso');
        clearFile();
        clearImage();
    } else {
        alert('Cadastro de produto falhou');
    }
}

function handleFileUpload(file) {
    if (file) {
        products.image = file;
        console.log("arquivo selecionado", file);
    }
}

function clearFile() {
    products.name = ('');
    products.description = ('');
    products.price = (0);
    products.stock = (0);
    products.category_id = (0);
    products.id = null; 
    
}
function clearImage() {
    products.image = null;
    imagePreviewUrl.value = null;
}

function editProduct(product) {
    console.log("Produto selecionado para edição:", product)
    products.name = product.name;
    products.description = product.description;
    products.price = product.price;
    products.stock = product.stock;
    products.category_id = product.category_id;
    products.id = product.id;  
    const imageUrl = getImg(product.image_path); 
    console.log("Caminho da imagem:", imageUrl);
    fileDropRef.value.setPreviewFromUrl(imageUrl);
}

onMounted(async () => {
    await store.getProductsStore();
});
</script>

<template>
    <section class="flex flex-row p-20 gap-5">
        <!-- Upload Product's Image -->
        <div class="flex flex-col gap-4 w-full max-w-sm">
            <label class="!font-bold text-lg text-gray-700">Product Image:</label>
            <FileDrop ref="fileDropRef" @upload="handleFileUpload">
            </FileDrop>
            <!-- Botão de Envio -->
            <div class="flex justify-center">
                <button @click="sendProduct"
                    class="w-auto h-auto flex justify-center text-lg rounded-md bg-indigo-600 px-3 py-3  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {{ products.id ? 'Edit Product' : 'Create Product' }}
                </button>
            </div>
        </div>

        <div class="flex flex-col gap-4 w-full max-w-sm">
            <!-- Campo Nome -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Name: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's name" v-model="products.name">
            </div>

            <!-- Campo Preço -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Price: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's price" v-model="products.price">
            </div>

            <!-- Campo Descrição -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Description: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="products.description" placeholder="Product's description">
            </div>
        </div>

        <div class="flex flex-col gap-4 w-full max-w-md">
            <!-- Campo Estoque -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Stock: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's stock" v-model="products.stock">
            </div>

            <!-- Campo Categoria -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Category ID: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's category" v-model="products.category_id">
            </div>
        </div>



    </section>
    <section class="flex flex-col p-20 gap-5 max-h-[400px] overflow-y-auto">
        <h2 class="font-bold text-lg text-black">Products already created</h2>
        <div v-for="product in store.products" :key="product.id"
            class="flex justify-between items-center border p-3 rounded-md shadow-sm">

            <div>
                <h3 class="font-bold text-sm text-black">Name: <span class="font-semibold text-gray-800">{{ product.name
                        }}</span></h3>
                <h3 class="font-bold text-sm text-black">Price: <span class="font-semibold text-gray-800">${{
                        product.price }}</span></h3>
                <h3 class="font-bold text-sm text-black">Stock: <span class="font-semibold text-gray-800">{{
                        product.stock }}</span></h3>
            </div>

            <button @click="editProduct(product)" class="text-blue-500 hover:text-blue-700">
                <img src="@/components/icons/actions/Toedit.svg" alt="Edit Icon">
            </button>
        </div>
    </section>

</template>