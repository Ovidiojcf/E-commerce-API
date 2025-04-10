import {defineStore} from 'pinia';
import { ref } from 'vue';
import { useCreateCart } from './cart';
export const useAuthStore = defineStore('auth', () => {
    const token = ref(null);
    const user = ref({}) //para receber o objeto usuário
    const isAuthenticated = ref(false) //usar para a proteção de rotas, provalvelmente o carrinho de compras.

    function logout(){
        token.value = null;
        user.value = {};
        isAuthenticated.value = false; 
    }

    function saveUser(result){
        user.value = result.user;
        token.value = result.token;
        isAuthenticated.value = true;

        //Chamada para inicializar o carrinho automaticamente após login
        const cartStore = useCreateCart();
        cartStore.initCart();
    }

    return { token, user, isAuthenticated, logout, saveUser }
}, {
    persist: true
})