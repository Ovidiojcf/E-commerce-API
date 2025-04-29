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
    <div class="w-full h-36 sm:h-48 lg:h-60 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
      <img class="max-h-full max-w-full object-contain" :src="imageUrl" :alt="name" />
    </div>

    <h5 class="mb-2 font-sans text-base sm:text-lg lg:text-xl font-semibold text-black line-clamp-2">{{ name }}</h5>
    <div class="flex flex-row justify-between">
      <h3 class="mb-2 text-base sm:text-xl !font-semibold text-black py-2">R$ {{ price }}</h3>
      <button class="w-6 sm:w-8" @click="toggleFavorite">
        <img class="rounded-xl w-full" :src="currentIcon" alt="Favorite" />
      </button>
    </div>
    <!-- <p class="mb-3 font-normal text-black text-justify">{{ description }}</p> -->
    <button @click="handleAddToCart" class="mx-auto flex justify-center text-sm sm:text-lg rounded-md
     bg-indigo-600 px-3 py-2 sm:px-4 sm:py-3 font-semibold text-white shadow-xs
     hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2
     focus-visible:outline-indigo-600">
      Add to Cart
    </button>

  </div>
</template>
