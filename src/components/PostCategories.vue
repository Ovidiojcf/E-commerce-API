<script setup>
import FileDrop from './FileDrop.vue';
import { useCreateCategories, useGetCategories } from '@/stores/category';
import { onMounted, ref } from 'vue';


const categories = useCreateCategories();
const categoriesById = ref([]);
const store = useGetCategories();


async function sendProduct() {
    const result = await categories.createCategorieForm();
    console.log('Resultado da API:', result);
    if (result) {
        alert('Categoria Cadastrada com sucesso');
        clearFile();
    } else {
        alert('Cadastro de categoria falhou');
    }
}

function handleFileUpload(file) {
    if (file) {
        categories.image = file;
        console.log("arquivo selecionado", file);
    }
}

function clearFile() {
    categories.name = ('');
    categories.description = ('');
}
function clearImage(){
    categories.image = null;
}

onMounted(async () =>{
    await store.getCategoriesStore();
    categoriesById.value = store.categoriesById;
})

</script>

<template>
    <section class="flex flex-row p-20 gap-5">
        <!-- Upload Category's Image -->
        <div class="flex flex-col gap-4 w-full max-w-sm">
            <label class="!font-bold text-lg text-black">Category Image:</label>
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
                <label class="!font-bold text-lg text-black">Name: </label>
                <input
                    v-model="categories.name"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's Category"> 
            </div>
            <!-- Campo Descrição -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Description: </label>
                <input
                    v-model="categories.description"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Categorie's description">
            </div>
        </div>

    </section>
    <section class="flex flex-col p-20 gap-5">
        <h2 class="!font-bold text-lg text-black">Categories already created</h2>
        <div v-for="categoriesid in categoriesById" key="categoriesById.id">
            <div class="grid cols-2">
                    <h3 class="!font-bold text-sm text-black">Name: <a class="!font-semibold text-gray-800">{{ categoriesid.name}}</a></h3>
                <div>
                    <h3 class="!font-bold text-sm text-black">Description: <a class="!font-semibold text-gray-800">{{ categoriesid.description }}</a></h3>
                </div>
            </div>
        </div>
    </section>
</template>