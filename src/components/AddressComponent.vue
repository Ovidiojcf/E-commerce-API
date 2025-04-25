<script setup>
import { onMounted, ref } from 'vue';
import { useGetAddress } from '@/stores/address';
import { useAuthStore } from '@/stores/auth';
import AddAddressForm from '@/components/AddAddressForm.vue';


const allAddress = ref([]);
const showForm = ref(false);
const store = useGetAddress();// para pegar os dados da store
const auth = useAuthStore(); // para apresentar o nome do usuário


async function loadAddresses() {
  await store.getAddressesStore();
  allAddress.value = store.addresses;
}

async function sendAddress() {
    const result = await address.createAddressForm();
    console.log('Resultado do Envio do Endereço: ', result);
    if (result) {
        alert('Endereço cadastrado com Sucesso');
    } else {
        alert('Endereço não foi cadastrado');
    }
}

function toggleForm() {
  showForm.value = !showForm.value;
}
onMounted(loadAddresses);
</script>

<template>
    <section class="space-y-6">
      <div class="flex justify-between items-start py-5" v-if="allAddress.length > 0">
        <h2 class="text-xl font-bold">My Addresses</h2>
        <button @click="toggleForm" class="btn btn-primary">New Address</button>
      </div>
  
      <!-- Encouragement Text if no address -->
      <div v-if="allAddress.length === 0" class="text-center bg-gray-100 p-6 rounded">
        <p class="text-black !mb-4">
          You haven't added any address yet. Please register one before shopping. 🏡
        </p>
        <button @click="toggleForm" class="btn btn-primary">Add Your First Address</button>
      </div>
  
      <!-- List Addresses -->
      <div class="grid gap-4" v-else>
        <div v-for="(addr, index) in allAddress" :key="index" class="p-4 bg-gray-200 rounded shadow-sm">
          <p class="font-semibold">{{ auth.user.name }}</p>
          <p>{{ addr.street }} {{ addr.number }}, {{ addr.zip }}</p>
          <p>{{ addr.city }} - {{ addr.state }}</p>
          <p>{{ addr.country }}</p>
        </div>
      </div>
  
      <!-- Form shown dynamically -->
      <AddAddressForm v-if="showForm" @close="showForm = false" @refresh="loadAddresses" />
    </section>
</template>
  
 <style src="@/assets/main.css"></style>