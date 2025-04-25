<script setup>
import { onMounted, computed } from 'vue';
import { useDiscountStore } from '@/stores/discounts';

const discounts = useDiscountStore();
const discountsList = computed(() => discounts.discountList);

async function sendDiscount() {
  if (discounts.id) {
    const result = await discounts.editDiscountForm();
    if (result) {
      alert('Desconto editado com sucesso');
      await discounts.getDiscountsList();
      discounts.clearForm();
    } else {
      alert('Falha na edição do desconto');
    }
  } else {
    const result = await discounts.createNewDiscount();
    if (result) {
      alert('Desconto criado com sucesso');
      await discounts.getDiscountsList();
      discounts.clearForm();
    } else {
      alert('Falha na criação do desconto');
    }
  }
}

async function editDiscount(discount) {
  discounts.setEditDiscount(discount);
  await discounts.getDiscountsList();
}

function DateFormat(date) {
  if (!date) return '';
  const data = new Date(date);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

onMounted(async () => {
  await discounts.getDiscountsList();
});
</script>

<template>
  <section class="flex flex-col p-10 gap-5">
    <h2 class="text-lg font-bold text-black">
      {{ discounts.id ? 'Edit Discount' : 'Create Discount' }}
    </h2>

    <div class="flex flex-col gap-4 w-full max-w-md">
      <label class="font-bold text-black">Description:</label>
      <input v-model="discounts.description" placeholder="Discount description"
        class="border rounded px-3 py-2 text-black" />

      <label class="font-bold text-black">Discount (%):</label>
      <input v-model="discounts.discountPercentage" type="number" placeholder="e.g., 15"
        class="border rounded px-3 py-2 text-black" />

      <label class="font-bold text-black">Start Date:</label>
      <input v-model="discounts.startDate" type="date" class="border rounded px-3 py-2 text-black" />

      <label class="font-bold text-black">End Date:</label>
      <input v-model="discounts.endDate" type="date" class="border rounded px-3 py-2 text-black" />

      <label class="font-bold text-black">Product ID:</label>
      <input v-model="discounts.productId" type="number" placeholder="Product ID"
        class="border rounded px-3 py-2 text-black" />

      <button @click="sendDiscount" class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded mt-4">
        {{ discounts.id ? 'Update Discount' : 'Create Discount' }}
      </button>
    </div>
  </section>

  <section class="flex flex-col p-10 gap-5">
    <h2 class="font-bold text-black text-lg">Existing Discounts</h2>
    <div v-for="discount in discountsList" :key="discount.id"
      class="flex justify-between items-center border p-3 rounded shadow-sm">
      <div>
        <h3 class="font-bold text-black text-sm">Description:
          <span class="font-semibold text-gray-800">{{ discount.description }}</span>
        </h3>
        <h3 class="font-bold text-black text-sm">Discount:
          <span class="font-semibold text-gray-800">{{ discount.discount_percentage }}%</span>
        </h3>
        <h3 class="font-bold text-black text-sm">Start:
          <span class="text-gray-700">{{ DateFormat(discount.start_date) }}</span>
        </h3>
        <h3 class="font-bold text-black text-sm">End:
          <span class="text-gray-700">{{ DateFormat(discount.end_date) }}</span>
        </h3>
        <h3 class="font-bold text-black text-sm">Product ID:
          <span class="text-gray-700">{{ discount.product_id }}</span>
        </h3>
      </div>
      <button @click="editDiscount(discount)" class="text-blue-500 hover:text-blue-700">✏️ Edit</button>
    </div>
  </section>
</template>
