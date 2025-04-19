import { defineStore } from "pinia";


export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: [], // Lista de produtos favoritos
    }),
    actions: {
        addFavorite(product) {
            if (!this.favorites.find(fav => fav.id === product.id)) {
                this.favorites.push(product);
            }
        },
        removeFavorite(productId) {
            this.favorites = this.favorites.filter(fav => fav.id !== productId);
        },
        isFavorite(productId) {
            return this.favorites.some(fav => fav.id === productId);
        },
    },
    persist: true,
});