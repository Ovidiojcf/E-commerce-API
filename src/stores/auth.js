import {defineStore} from 'pinia';
import { ref } from 'vue';

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

    }

    return { token, user, isAuthenticated, logout, saveUser }
}, {
    persist: true
})