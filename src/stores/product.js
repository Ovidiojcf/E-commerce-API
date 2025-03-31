import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createProduct, getProducts } from '@/services/HttpService';


// é necessário utilizar os forms do JS e consumilo na função, após exportamos o a função para utilizala na UI.
export const useCreateProducts = defineStore('products', () =>{
    //Variaveis para capturar os campos sobre o produto
    const name = ref('')
    const description = ref('')
    const price = ref(0)
    const stock = ref(0)
    const category_id = ref('0')
    const image = ref('')

    function getFormData(){
        const formData = new FormData();
        formData.append('name', name.value);//Modo o qual a api recebe o envio
        formData.append('description', description.value);
        formData.append('price', price.value);
        formData.append('stock', stock.value);
        formData.append('category_id', category_id.value);
        formData.append('image', image.value);

        return formData;
    }

    async function createProductForm() {
        try {
            const formData = getFormData();
            const data = await createProduct(formData);
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
            }
            return data;
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
        image,
        createProductForm
    }

});

// 'getProducts' é o nome do estado/objeto dado no pinia
export const useGetProducts = defineStore('getProducts', () =>{
    const products = ref([]);

    async function getProductsStore() {
        try {
            const data = await getProducts();
            products.value = data;
        } catch (error) {
            console.error("Error ao consumir a função GET" + error)
        }
    }
    return {products, getProductsStore};
});