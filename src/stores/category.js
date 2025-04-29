import { ref } from "vue";
import { defineStore } from "pinia";
import { createCategory, editCategory, getCategoties, editCategoryImage } from "@/services/HttpService";


export const useCreateCategories = defineStore('categories', () => {

    const name = ref('');
    const description = ref('');
    const image = ref('');
    const id = ref(null);

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
    async function editCategoryForm() {
        if(!id.value) return;

        try {
            const categoryData = {
                name: name.value,
                description: description.value,
                image: image.value
            };
            const data = await editCategory(id.value, categoryData);
            if (image.value) {
                await editCategoryImage(id.value, image.value);
            }
            return data;
        } catch (error) {
            console.error("Erro ao editar a categoria", JSON.stringify(error.response?.data, null, 2));
        }
    }

    function setEditCategory(category){
        id.value = category.id;
        name.value = category.name;
        description.value = category.description;
        image.value = category.image;
    }

    return{
        id,
        name,
        description,
        image,
        createCategorieForm,
        editCategoryForm,
        setEditCategory
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