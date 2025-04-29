<script setup>
import { useGetCategories } from '@/stores/category';
import { onMounted, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';


const allCategories = ref([]);
const store = useGetCategories();

function getImgCategory(image_path){
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
    <section class="w-full px-4">
      <h2 class="text-xl font-bold mb-4">Ofertas por categoria</h2>
  
      <Swiper
        :modules="[Navigation]"
        :breakpoints="{
          320: { slidesPerView: 2.5, spaceBetween: 10 },
          640: { slidesPerView: 3.5, spaceBetween: 15 },
          1024: { slidesPerView: 5, spaceBetween: 20 }
        }"
        navigation
        class="w-full"
      >
        <SwiperSlide
            v-for="(item, index) in allCategories"
          :key="index"
          class="flex flex-col items-center"
        >
          <div class="bg-indigo-600 rounded-full p-4 w-24 h-24 flex items-center justify-center">
            <img :src="getImgCategory(item.image_path)" :alt="item.name" class="w-16 h-16 object-contain" />
          </div>
          <p class="mt-2 text-center text-sm font-medium">{{ item.name }}</p>
        </SwiperSlide>
      </Swiper>
    </section>
  </template>
  