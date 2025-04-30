import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createOrder, getOrdersByAdmin, editStatusOrder  } from '@/services/HttpService'; // Corrigido para a função certa
import { useAuthStore } from '@/stores/auth';

export const useCreateOrder = defineStore('orders', () => {
    const address = ref(null);
    const coupom = ref(null);
    const order = ref(null);
    const orders = ref([]); // ← AQUI

    const token = useAuthStore().token;

    async function createOrderSubmit(orderData) {
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
            const data = await getOrdersByAdmin(token);
            orders.value = data;
        } catch (error) {
            console.error('Erro ao buscar pedidos via store:', error);
        }
    };

    async function editOrderStatusStore(orderId, newStatus) {
        console.log(`Alterando status do pedido ${orderId} para ${newStatus}`);
        try {
            await editStatusOrder(orderId, newStatus, token);
            console.log(`Status do pedido ${orderId} atualizado com sucesso`);
            await getOrdersStore(); // Atualiza a lista após mudança
        } catch (error) {
            console.error('Erro ao editar status do pedido:', error);
        }
    }

    return {
        address,
        coupom,
        order,
        orders, 
        createOrderSubmit,
        getOrdersStore,
        editOrderStatusStore
    }
});
