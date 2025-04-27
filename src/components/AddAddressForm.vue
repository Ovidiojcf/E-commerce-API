<script setup>
import { useCreateAddress } from '@/stores/address';
import { defineEmits } from 'vue';

const emit = defineEmits(['close', 'refresh']);
const address = useCreateAddress();

const handleSubmit = async () => {
  let result;
  
  if (address.id) {
    result = await address.editAddressForm(); // se tiver id -> edita
  } else {
    result = await address.createAddressForm(); // se não tiver id -> cria
  }

  if (result) {
    alert(address.id ? 'Endereço editado com sucesso!' : 'Endereço cadastrado com sucesso!');
    emit('refresh');
    emit('close');
  } else {
    alert('Falha ao salvar endereço.');
  }
};
</script>

<template>
  <div class="bg-gray-50 p-6 rounded-lg shadow w-full max-w-md mx-auto">
    <h3 class="text-lg font-bold mb-4">Create New Address</h3>
    <div class="space-y-3">
      <input v-model="address.street" placeholder="Street" class="input" />
      <input v-model="address.number" placeholder="Number" class="input" />
      <input v-model="address.zip" placeholder="Zip" class="input" />
      <input v-model="address.city" placeholder="City" class="input" />
      <input v-model="address.state" placeholder="State" class="input" />
      <input v-model="address.country" placeholder="Country" class="input" />
      <div class="flex gap-2 mt-4">
        <button @click="handleSubmit" class="btn btn-primary">Save</button>
        <button @click="$emit('close')" class="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/main.css"></style>