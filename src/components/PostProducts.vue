<script setup>
import FileDrop from './FileDrop.vue';
import { useCreateProducts } from '@/stores/product';
const products = useCreateProducts();


async function sendProduct() {
    const result = await products.createProductForm();
    console.log(result);
    if (result) {
        alert('Produto Cadastrado com sucesso');
        clearFile();
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
}
function clearImage(){
    products.image = null;
}
</script>

<template>
    <section class="flex flex-row p-20 gap-5">
        <!-- Upload Product's Image -->
        <div class="flex flex-col gap-4 w-full max-w-sm">
            <label class="!font-bold text-lg text-gray-700">Product Image:</label>
            <FileDrop 
                @upload="handleFileUpload"
                @clear="clearImage()">
            </FileDrop>
            <!-- Botão de Envio -->
            <div class="flex justify-center">
                <button 
                @click="sendProduct"
                @clear="clearFile()" 
                class="w-auto h-auto flex justify-center text-lg rounded-md bg-indigo-600 px-3 py-3  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create Product
            </button>
            </div>
        </div>
        
        <div class="flex flex-col gap-4 w-full max-w-sm">
            <!-- Campo Nome -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Name: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's name" 
                    v-model="products.name">
            </div>

            <!-- Campo Preço -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Price: </label>
                <input 
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's price" 
                    v-model="products.price"
                   >
            </div>

            <!-- Campo Descrição -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Description: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    v-model="products.description" 
                    placeholder="Product's description">
            </div>
        </div>

        <div class="flex flex-col gap-4 w-full max-w-md">
            <!-- Campo Estoque -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Stock: </label>
                <input 
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's stock" 
                    v-model="products.stock"
                   >
            </div>
            
            <!-- Campo Categoria -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Category ID: </label>
                <input 
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's category" 
                    v-model="products.category_id">
            </div>
        </div>
        
        
        
    </section>
</template>