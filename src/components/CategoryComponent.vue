<script setup>
import { useGetCategories } from '@/stores/category';
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


const allCategories = ref([]);
const store = useGetCategories();

function getImgCategory(image_path) {
    const baseUrl = 'http://35.196.79.227:8000' //base url da api
    return `${baseUrl}${image_path}`
}

onMounted(async () => {
    await store.getCategoriesStore();
    allCategories.value = store.categories;
    console.log("Resposta da API para Categories: ", allCategories);
})
</script>


<template>
    <section class="w-full px-10">
        <h2 class="text-xl font-bold !mt-4 !mb-4">Ofertas por categoria</h2>

        <Swiper :modules="[Navigation]" :breakpoints="{
            320: { slidesPerView: 2.5, spaceBetween: 25 },
            640: { slidesPerView: 3.5, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 15 }
        }" navigation class="w-full">
            <SwiperSlide v-for="(item, index) in allCategories" :key="index"
                class="flex flex-col items-center justify-center text-center">
                <div class="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden !mb-2">
                    <img :src="getImgCategory(item.image_path)" :alt="item.name" class="object-cover" />
                </div>
                <p class="w-full text-center text-sm !font-bold">{{ item.name }}</p>
            </SwiperSlide>
        </Swiper>
    </section>
</template>