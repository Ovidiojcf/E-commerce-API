<script setup>
import FileDrop from './FileDrop.vue';
import { useCreateCategories, useGetCategories } from '@/stores/category';
import { onMounted, computed } from 'vue';


const categories = useCreateCategories();
const categoriesById = computed(() => store.categoriesById); // Agora sempre reflete a store
const store = useGetCategories();


async function sendProduct() {

    if (categories.id) {
        const result = await categories.editCategoryForm();
        console.log("Resultado da edição: ", result);
        if (result) {
            alert('Categoria Editada com Sucesso');
            await store.getCategoriesStore();
            clearForm();
        } else {
            alert('Falha na edição da Categoria');
        }
    } else {
        const result = await categories.createCategorieForm();
        console.log('Resultado da criação:', result);
        if (result) {
            alert('Categoria Cadastrada com Sucesso')
        } else {
            alert('Cadastro da categoria falhou');
        }
        clearForm();
        await store.getCategoriesStore();
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
function clearImage() {
    categories.image = null;
}

function clearForm() {
    categories.id = null; // Resetar ID para nova criação
    categories.name = '';
    categories.description = '';
    categories.image = null;
}
// Função para carregar a categoria no formulário ao clicar no botão de edição
function editCategory(category) {
    console.log("Categoria selecionada para edição:", category)
    categories.setEditCategory(category);
    console.log("ID salvo na store:", categories.id);
}

onMounted(async () => {
    await store.getCategoriesStore();
})

</script>

<template>
    <section class="flex flex-row p-20 gap-5">
        <!-- Upload Category's Image -->
        <div class="flex flex-col gap-4 w-full max-w-sm">
            <label class="!font-bold text-lg text-black">Category Image:</label>
            <FileDrop @upload="handleFileUpload" @clear="clearImage()">
            </FileDrop>
            <!-- Botão de Envio -->
            <div class="flex justify-center">
                <button @click="sendProduct" @clear="clearFile()"
                    class="w-auto h-auto flex justify-center text-lg rounded-md bg-indigo-600 px-3 py-3  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {{ categories.id ? 'Edit Category' : 'Create Category' }}
                </button>
            </div>
        </div>

        <!-- Input Categorie Data -->
        <div class="flex flex-col gap-4 w-full max-w-sm">
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Name: </label>
                <input v-model="categories.name"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Product's Category">
            </div>
            <!-- Campo Descrição -->
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Description: </label>
                <input v-model="categories.description"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Categorie's description">
            </div>
        </div>

    </section>
    <section class="flex flex-col p-20 gap-5">
        <h2 class="!font-bold text-lg text-black">Categories already created</h2>
        <div v-for="category in categoriesById" :key="category.id"
            class="flex justify-between items-center border p-3 rounded-md shadow-sm">
            <div>
                <h3 class="!font-bold text-sm text-black">Name: <span class="!font-semibold text-gray-800">{{
                    category.name }}</span></h3>
                <h3 class="!font-bold text-sm text-black">Description: <span class="!font-semibold text-gray-800">{{
                    category.description }}</span></h3>
            </div>
            <button @click="editCategory(category)" class="text-blue-500 hover:text-blue-700">
                ✏️ Edit
            </button>
        </div>
    </section>
</template>