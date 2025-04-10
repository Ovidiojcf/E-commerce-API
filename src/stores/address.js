import { createAddress, getAddress } from "@/services/HttpService";
import { defineStore } from "pinia";
import { ref } from "vue";


export const useCreateAddress = defineStore('address', () => {
    const street = ref('');
    const number = ref(0);
    const zip = ref(0);
    const city = ref('');
    const state = ref('');
    const country = ref('');

    function getAddressPayload() {
        return {
            street: street.value,
            number: Number(number.value),
            zip: zip.value,
            city: city.value,
            state: state.value,
            country: country.value
        };
    }

    // Atualizado: envia JSON pro backend
    async function createAddressForm() {
        try {
            const payload = getAddressPayload();
            const data = await createAddress(payload); // API espera JSON!
            return data;
        } catch (error) {
            console.error("Erro ao criar o endereço:", JSON.stringify(error.response?.data || error, null, 2));
        }
    }

    return{
        street,
        number,
        zip,
        city,
        state,
        country,
        createAddressForm
    }
})

// para guardar os dados no pinia agora

export const useGetAddress = defineStore('getAddress', () => {
    const addresses = ref([]);

    async function  getAddressesStore() {
        try {
            const data = await getAddress();
            addresses.value = data;
        } catch (error) {
            console.error("Error ao consumir a função GET Address" + error)
        }
    }
    return {addresses, getAddressesStore};
})
