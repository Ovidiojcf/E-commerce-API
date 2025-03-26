import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createProduct } from '@/services/HttpService';


// é necessário utilizar os forms do JS e consumilo na função, após exportamos o a função para utilizala na UI.
export const useCreateProducts = defineStore('products', () =>{
    //Variaveis para capturar os campos sobre o produto
    const name = ref('')
    const description = ref('')
    const price = ref(0)
    const stock = ref(0)
    const category_id = ref('0')
    const img = ref('')

    function getFormData(){
        const formData = new FormData();
        formData.append('name', name.value);//Modo o qual a api recebe o envio
        formData.append('description', description.value);
        formData.append('price', price.value);
        formData.append('stock', stock.value);
        formData.append('category_id', category_id.value);
        formData.append('img', img.value);

        return formData;
    }

    async function createProductForm(params) {
        try {
            const formData = getFormData();
            const data = await createProduct(formData);
        } catch (error) {
            console.error("Erro ao criar produto:", JSON.stringify(error.response?.data, null, 2));
        }
    }

    return {
        name,
        description,
        price,
        stock,
        category_id,
        img,
        createProductForm
    }

})