import { ref } from "vue";
import { defineStore } from "pinia";
import { createCategory } from "@/services/HttpService";


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