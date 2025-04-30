<script setup>
import { onMounted } from 'vue';
import { useCreateOrder } from '@/stores/order';

const orderStore = useCreateOrder();

const statusOptions = ['PENDING', 'PROCESSING', 'SHIPPED', 'COMPLETED', 'CANCELED'];

onMounted(async () => {
  await orderStore.getOrdersStore();
});

const updateStatus = async (orderId, newStatus) => {
  await orderStore.editOrderStatusStore(orderId, newStatus);
};
</script>

<template>
  <section class="flex flex-col p-20 gap-5">
    <h2 class="!font-bold text-lg text-black">Meus Pedidos</h2>

    <div v-if="orderStore.orders.length === 0" class="text-gray-600">
      Nenhum pedido encontrado.
    </div>

    <div
      v-else
      v-for="order in orderStore.orders"
      :key="order.id"
      class="flex flex-col border p-3 rounded-md shadow-sm gap-2 bg-white"
    >
      <div class="flex justify-between items-center">
        <h3 class="!font-bold text-sm text-black">ID do Pedido:
          <span class="!font-semibold text-gray-800">{{ order.id }}</span>
        </h3>

        <select
          :value="order.status"
          @change="updateStatus(order.id, $event.target.value)"
          class="text-sm bg-white border border-gray-300 rounded px-2 py-1 text-purple-700 font-semibold uppercase"
        >
          <option v-for="status in statusOptions" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

      <p class="text-sm text-gray-700">
        <strong class="text-black">Data:</strong>
        {{ new Date(order.order_date).toLocaleDateString() }}
      </p>

      <p class="text-sm text-gray-700" v-if="order.products && order.products.length > 0">
        <strong class="text-black">Produtos:</strong>
      </p>
      <ul v-if="order.products && order.products.length > 0" class="ml-4 text-sm text-gray-800">
        <li v-for="product in order.products" :key="product.name">
          {{ product.name }} – R$ {{ product.price }}
        </li>
      </ul>
    </div>
  </section>
</template>
