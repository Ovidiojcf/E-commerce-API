<script setup>
import FileDrop from './FileDrop.vue';


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
        <!-- Upload Category's Image -->
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
                Create Categorie
            </button>
            </div>
        </div>

        <!-- Input Categorie Data -->
        <div class="flex flex-col gap-4 w-full max-w-sm">
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Name: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's Category"> 
            </div>
            <!-- Campo Descrição -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-gray-700">Description: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Categorie's description">
            </div>
        </div>

    </section>
</template>