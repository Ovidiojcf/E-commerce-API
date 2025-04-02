<script setup>
import { useGetCategories } from '@/stores/category';
import { onMounted, ref } from 'vue';

const allCategories = ref([]);
const store = useGetCategories();

function getImgCategory(imagePath){
    const baseUrl = 'http://35.196.79.227:8000/' //base url da api
    return `${baseUrl}${image_path}`
    }

onMounted(async () => {
    await store.getCategoriesStore();
    allCategories.value = store.categories;
    console.log("Resposta da API para Categories: ", allCategories);
})
</script>


<template>
    <section class="bg-white p-10">
        <h2>Categorias GET</h2>
        <div class="grid grid-rows-1">
            <div
            class="w-full gap-4 p-5 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <div v-for="category in allCategories" :key="category.id">
                    <img class="rounded-xl" :src="getImgCategory(category.image_path)" alt="">
                    <h3 class="mb-2 font-sans text-2xl !font-bold text-black">
                        {{ category.name }}
                    </h3>
                    <p class="mb-3 font-normal text-black text-justify">{{ category.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>