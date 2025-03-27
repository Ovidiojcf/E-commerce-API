<script setup>
import Header from '@/components/HeaderComponent.vue'
import { useCreateProducts } from '@/stores/product';
const products = useCreateProducts();


async function sendProduct() {
    const result = await products.createProductForm;

    if (result.status === 201) {
        alert('Produto Cadastrado com sucesso');
    } else {
        alert('Cadastro de produto falhou');
    }
}

function handleFileUpload(event) {
    const file = event.target.files[0]
    if (file) {
        products.img = file
        console.log("arquivo selecionado", file)
    }
}

</script>

<template>
    <Header></Header>
    <section class="flex flex-row p-20 gap-5">
        <div class="flex flex-col gap-4 w-full max-w-md">
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
        
        <!-- Upload de Arquivo -->
        <div class="flex flex-col gap-2">
            <label class="!font-bold text-lg text-gray-700">Product Image:</label>
            <input 
                type="file" 
                @change="handleFileUpload" 
                class="w-full text-gray-700 py-2 px-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
        
        <!-- Botão de Envio -->
        <button 
            @click="sendProduct()" 
            class="w-auto h-12 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create Product
        </button>
    </section>
</template>