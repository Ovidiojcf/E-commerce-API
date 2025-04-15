<script setup>
import { useCreateAddress } from '@/stores/address';
import { useGetAddress } from '@/stores/address';
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';

const allAddress = ref([]);
const address = useCreateAddress();// para enviar para api
const store = useGetAddress();// para pegar os dados da store
const auth = useAuthStore(); // para apresentar o nome do usuário

async function sendAddress() {
    const result = await address.createAddressForm();
    console.log('Resultado do Envio do Endereço: ', result);
    if (result) {
        alert('Endereço cadastrado com Sucesso');
    } else {
        alert('Endereço não foi cadastrado');
    }
}

onMounted(async () => {
    await store.getAddressesStore();
    allAddress.value = store.addresses;
    console.log('Resposta da API para Addresses: ', allAddress);
})
</script>

<template>
    <section class="flex flex-row p-20 gap-10">
        <div class="w-full">
            <h2 class="text-lg font-bold mb-4">Added Addresses</h2>
            <div class="flex flex-col gap-4">
                <div v-for="(addresses, index) in allAddress" :key="index" class="bg-gray-100 p-4 rounded-sm">
                    <div class="flex justify-between items-start mb-4">
                        <!-- Coluna da Esquerda: Nome + Endereço -->
                        <div>
                            <!-- Nome -->
                            <div class="flex items-center mb-1">
                                <span class="!font-semibold text-lg">{{ auth.user.name }}</span>
                            </div>

                            <!-- Address details -->
                            <div>
                                <p class="text-gray-800">
                                    {{ addresses.street }} {{ addresses.number }}, {{ addresses.zip }}
                                </p>
                                <p class="text-gray-800">
                                    {{ addresses.city }} - {{ addresses.state }}
                                </p>
                                <p class="text-gray-800">
                                    {{ addresses.country }}
                                </p>
                            </div>
                        </div>

                        <!-- Coluna da Direita: Botões -->
                        <div class="flex space-x-2">
                            <button class="p-2" @click="editAddress(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-pen">
                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                                </svg>
                            </button>
                            <button class="p-2" @click="removeAddress(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-x">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Empty state -->
            <div v-if="allAddress.length <= 0" class="text-center py-8 bg-gray-100 rounded-sm">
                <p class="text-gray-500">Nenhum endereço adicionado</p>
            </div>
        </div>

        <div class="flex flex-col gap-4 w-full max-w-sm">
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Street: </label>
                <input v-model="address.street"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your street">
            </div>
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Number: </label>
                <input v-model="address.number"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your house's number">
            </div>
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Zip: </label>
                <input v-model="address.zip"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type you ZIP Code">
            </div>
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">City: </label>
                <input v-model="address.city"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your City">
            </div>
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">State: </label>
                <input v-model="address.state"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your State">
            </div>

            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Country: </label>
                <input v-model="address.country"
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your Country">
            </div>
            <button @click="sendAddress"
                class="w-auto h-auto flex justify-center text-lg rounded-md bg-indigo-600 px-3 py-3  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create Address
            </button>
        </div>
    </section>
</template>