import {defineStore} from 'pinia';
import { ref } from 'vue';
import { useCreateCart } from './cart';

export const useAuthStore = defineStore('auth', () => {
    const token = ref(null);
    const user = ref({}) //para receber o objeto usuário
    const isAuthenticated = ref(false) //usar para a proteção de rotas, provalvelmente o carrinho de compras.
    const cartStore = useCreateCart();

    function logout(){
        token.value = null;
        user.value = {};
        isAuthenticated.value = false;
        cartStore.cartItems = []; // Limpa os itens do carrinho
        cartStore.cartId = null;
        cartStore.totalAmount = 0;
    }

    function saveUser(result){
        user.value = result.user;
        token.value = result.token;
        isAuthenticated.value = true;

        // Limpa o carrinho ANTES de criar o novo
        cartStore.cartItems = [];
        cartStore.cartId = null;
        cartStore.totalAmount = 0;

        //Chamada para inicializar o carrinho automaticamente após login
        cartStore.initCart(token.value);
    }

    return { token, user, isAuthenticated, logout, saveUser }
}, {
    persist: true
})