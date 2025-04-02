import { ref } from "vue";
import { defineStore } from "pinia";
import { createCategory, getCategoties } from "@/services/HttpService";


export const useCreateCategories = defineStore('categories', () => {

    const name = ref('');
    const description = ref('');
    const image = ref('');

    function getFormDataCategorie(){
        const formDataCategorie = new FormData();
        formDataCategorie.append('name', name.value);//Modo o qual a api recebe o envio
        formDataCategorie.append('description', description.value);
        formDataCategorie.append('image', image.value);

        return formDataCategorie;
    }

    async function createCategorieForm() {
        try{
            const form = getFormDataCategorie();
            const data = await createCategory(form);
            return data;
        }catch(error){
            console.error("Error ao criar a categoria", JSON.stringify(error.response?.data, null, 2)); 
        }
    }
    
    return{
        name,
        description,
        image,
        createCategorieForm
    }
})
//função implementada para guardar os dados nas stores
export const useGetCategories = defineStore('getCategories', () =>{
    const categories = ref([]);
    const categoriesById = ref([]);

    async function getCategoriesStore() {
        try {
            const data = await getCategoties();
            categories.value = data;
            categoriesById.value = categories.value.filter(category => category.user_id === 7);
        } catch (error) {
            console.error('Error ao consumir a função GET: ' + error);
        }
    }
    return { categories, categoriesById , getCategoriesStore};
}); 