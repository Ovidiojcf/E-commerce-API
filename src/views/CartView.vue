<script setup>
import CartItemComponent from '@/components/CartItemComponent.vue';
import AddressSelector from '@/components/AddressSelector.vue';
import { useCreateCart } from '@/stores/cart';
import { useCreateOrder } from '@/stores/order';
import { computed, ref } from 'vue';
import Header from '@/components/HeaderComponent.vue';
const cartStore = useCreateCart();
const cartItems = computed(() => cartStore.cartItems || []);
const cartHasItems = computed(() => cartItems.value.length > 0) // resultado para utilizar no v-if
const groupedItems = computed(() => groupCartItems(cartItems.value));
const selectedAddressId = ref(null); //para escolher o endereço final
const orderStore = useCreateOrder();
function groupCartItems(items) {
    const grouped = {};

    items.forEach(item => {
        if (!grouped[item.product_id]) {
            grouped[item.product_id] = {
                ...item,
                quantity: item.quantity,
                ids: [item.id], // salva os IDs diferentes se quiser usar depois
            };
        } else {
            grouped[item.product_id].quantity += item.quantity;
            grouped[item.product_id].ids.push(item.id);
        }
    });

    return Object.values(grouped);
}

function incrementItem(item) {
    cartStore.incrementItemQuantity(item.id);
}

function decrementItem(item) {
    cartStore.decrementItemQuantity(item.id);
}

function removeItem(item) {
    cartStore.removeFromCart(item);
}
function handleAddressSelected(addressId) {
    selectedAddressId.value = addressId;
    console.log('Endereço selecionado:', addressId);
}

async function submitOrder() {
    if (!selectedAddressId.value) {
        alert('Por favor, selecione um endereço para entrega.');
        return;
    }

    if (groupedItems.value.length === 0) {
        alert('Seu carrinho está vazio.');
        return;
    }

    // Monta os dados necessários
    const items = groupedItems.value.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
    }));

    // Atualiza os dados na store
    orderStore.address = selectedAddressId.value;
    // orderStore.cupom = 'DESCONTO10'; // se quiser trabalhar com cupom depois
    try {
        const orderData = {
            address_id: selectedAddressId.value,
            items: items,
            // cupom: orderStore.cupom, // opcional
        };

        const response = await orderStore.createOrderSubmit(orderData);
        alert('Pedido realizado com sucesso!');
        console.log('Pedido criado:', response);

        // limpa o carrinho
        //cartStore.clearCart();
        // redireciona para uma tela de sucesso ou pedidos
        // router.push('/pedidos'); // se estiver usando Vue Router
    } catch (error) {
        console.error('Erro ao finalizar pedido:', error);
        alert('Erro ao finalizar pedido. Tente novamente.');
    }
}
</script>
<template>
    <Header />
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl !font-bold mb-6">Seu Carrinho</h1>

        <div v-if="cartHasItems">
            <div class="mb-4 pb-4 border-b">
                <h2 class="text-lg font-semibold">Itens do Carrinho ({{ cartItems.length }})</h2>
            </div>
            <!-- Listagem de Itens do Carrinho -->
            <CartItemComponent v-for="item in groupedItems" :key="item.product_id" :item="item"
                @increment="incrementItem" @decrement="decrementItem" @remove="removeItem" />
            <!-- Seletor de Endereço -->
            <div class="mt-10 py-5">
                <AddressSelector @addressSelected="handleAddressSelected" />
            </div>
        </div>

        <div v-else class="flex flex-col justify-content items-center text-center gap-4 py-12">
            <h2 class="text-xl !font-semibold mb-4">Seu carrinho está vazio</h2>
            <p class="text-gray-400">Adicione produtos ao seu carrinho</p>
            <router-link to="/home"
                class="w-64 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Continuar Comprando
            </router-link>
        </div>
        <div class="mt-10">
            <h1 class="text-xl font-bold mb-4">Finalizar Pedido</h1>
            <button @click="submitOrder" class="bg-indigo-600 text-white px-4 py-2 rounded-md">
                Finalizar
            </button>
        </div>
    </div>
</template>