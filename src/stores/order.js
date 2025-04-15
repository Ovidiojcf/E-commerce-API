import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createOrder } from '@/services/HttpService';
import { useAuthStore } from '@/stores/auth';


export const useCreateOrder = defineStore('orders', () => {
    const address = ref(null);
    const coupom = ref(null);
    const order = ref(null);

    const token = useAuthStore().token;

    async function createOrderSubmit(orderData){
        try {
            const response = await createOrder(orderData, token);
            return response;
        } catch (error) {
            console.error('Erro ao criar pedido via store:', error);
            throw error;
        }
    }

    const getOrdersStore = async () => {
        try {
            const data = await getOrders(token);
            orders.value = data;
        } catch (error) {
            console.error('Erro ao buscar pedidos via store:', error);
        }
    };

    return{
        address,
        coupom,
        order,
        createOrderSubmit,
        getOrdersStore
    }

});