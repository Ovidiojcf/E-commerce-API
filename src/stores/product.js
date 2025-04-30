import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createProduct, getProducts, editProduct, editProductImage } from '@/services/HttpService';
import { useAuthStore } from './auth';


// é necessário utilizar os forms do JS e consumilo na função, após exportamos o a função para utilizala na UI.
export const useCreateProducts = defineStore('products', () =>{
    //Variaveis para capturar os campos sobre o produto
    const id = ref(null);
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
            const auth = useAuthStore();
            const token = auth.token;
    
            // Se estiver editando
            if (id.value !== null) {
                const productData = {
                    name: name.value,
                    description: description.value,
                    price: price.value,
                    stock: stock.value,
                    category_id: category_id.value
                };
    
                const editResult = await editProduct(id.value, productData, token);
                console.log("Produto editado com sucesso", editResult);
    
                // Se houver imagem nova, atualiza a imagem
                if (image.value && image.value instanceof File) {
                    const imgResult = await editProductImage(id.value, image.value, token);
                    console.log("Imagem atualizada com sucesso", imgResult);
                }
    
                return editResult;
            }
    
            // Se for criação
            const formData = getFormData();
            const createResult = await createProduct(formData);
    
            // Debug dos dados enviados
            for (let pair of formData.entries()) {
                console.log(pair[0] + ': ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
            }
    
            return createResult;
        } catch (error) {
            console.error("Erro ao criar/editar produto:", JSON.stringify(error.response?.data, null, 2));
        }
    }

    return {
        id,
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

    function searchProductsByName(query) {
        if (!query.trim()) return [];
    
        return products.value.filter(product =>
          product.name.toLowerCase().includes(query.trim().toLowerCase())
        );
      }
    return {products, getProductsStore, searchProductsByName};
});