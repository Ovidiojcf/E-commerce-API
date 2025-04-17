<script setup>
import { ref, onMounted } from 'vue';
import { useGetAddress } from '@/stores/address';
import { useAuthStore } from '@/stores/auth';

const emit = defineEmits(['addressSelected']);

const store = useGetAddress();
const auth = useAuthStore();
const selected = ref(null);
const allAddresses = ref([]);

onMounted(async () => {
  await store.getAddressesStore();
  allAddresses.value = store.addresses;
});

function selectAddress(address) {
  selected.value = address.id;
  emit('addressSelected', address.id);
}
</script>

<template>
  <div>
    <h2 class="text-lg !font-bold !mb-4">Selecione um endereço</h2>
    <div v-if="allAddresses.length > 0" class="grid gap-4">
      <div
        v-for="address in allAddresses"
        :key="address.id"
        :class="['p-4 border rounded-md cursor-pointer', selected === address.id ? 'bg-indigo-100 border-indigo-500' : '']"
        @click="selectAddress(address)"
      >
        <p class="font-semibold">{{ auth.user.name }}</p>
        <p>{{ address.street }}, {{ address.number }} - {{ address.zip }}</p>
        <p>{{ address.city }} - {{ address.state }}</p>
        <p>{{ address.country }}</p>
      </div>
    </div>
    <div v-else class="text-gray-500">Nenhum endereço disponível.</div>
  </div>
</template>
