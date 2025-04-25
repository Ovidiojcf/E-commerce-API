<script setup>
import { defineProps, computed } from 'vue';
import { useCreateCart } from '@/stores/cart';
import { useFavoritesStore } from '@/stores/favorites';
import LikeIcon from '@/components/icons/actions/Like.svg';
import FavoritesIcon from '@/components/icons/actions/Favorites.svg';

//Props devem vir antes de qualquer uso
const props = defineProps({
  id: Number,
  name: String,
  price: [Number, String],
  imageUrl: String
});


const cartStore = useCreateCart();
const favoritesStore = useFavoritesStore();

const isFavorite = computed(() => favoritesStore.isFavorite(props.id));

//Alternar entre favorito ou não
const toggleFavorite = () => {
  const product = {
    id: props.id,
    name: props.name,
    price: props.price,
    imageUrl: props.imageUrl
  };

  if (isFavorite.value) {
    favoritesStore.removeFavorite(props.id);
  } else {
    favoritesStore.addFavorite(product);
  }
};

// alternar entre favorito ou não
const currentIcon = computed(() => isFavorite.value ? LikeIcon : FavoritesIcon);


// botão de adicionar ao carrinho
function handleAddToCart() {
  cartStore.addToCart({
    productId: props.id,
    quantity: 1,
    unitPrice: props.price
  });
}
</script>

<template>
  <div
    class="w-full gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <img class="rounded-xl" :src="imageUrl" :alt="name">
    <h5 class="mb-2 font-sans text-2xl !font-bold text-black">{{ name }}</h5>
    <div class="flex flex-row justify-between">
      <h3 class="mb-2 text-xl !font-semibold  text-black py-2">R$ {{ price }}</h3>
      <button @click="toggleFavorite">
        <img :src="currentIcon" alt="Favorite" />
      </button>
    </div>
    <!-- <p class="mb-3 font-normal text-black text-justify">{{ description }}</p> -->
    <button @click="handleAddToCart" class="w-auto h-auto flex justify-center text-lg rounded-md
            bg-indigo-600 px-3 py-3 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2
            focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
      Adicionar
    </button>
  </div>
</template>
