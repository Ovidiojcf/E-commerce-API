import { defineStore } from "pinia";
import { ref } from "vue";
import { createDiscount, getDiscounts, editDiscount } from "@/services/HttpService";
import { useAuthStore } from "@/stores/auth";

export const useDiscountStore = defineStore('discounts', () => {
    const id = ref(null); // id retornado pela API
    const description = ref('');
    const discountPercentage = ref(null);
    const startDate = ref('');
    const endDate = ref('');
    const productId = ref(null);

    const discountList = ref([]);

    const token = useAuthStore().token;

    async function createNewDiscount() {
        try {
            const discountData = {
                description: description.value,
                discount_percentage: discountPercentage.value,
                start_date: startDate.value,
                end_date: endDate.value,
                product_id: productId.value
            };
            const result = await createDiscount(discountData, token);
            return result;
        } catch (error) {
            console.error('Erro ao criar desconto:', error);
        }
    }

    async function editDiscountForm() {
        try {
            const discountData = {
                description: description.value,
                discount_percentage: discountPercentage.value,
                start_date: startDate.value,
                end_date: endDate.value,
                product_id: productId.value
            };
            const result = await editDiscount(id.value, discountData, token);
            return result;
        } catch (error) {
            console.error("Erro ao editar desconto:", error);
        }
    }

    async function getDiscountsList() {
        try {
            const response = await getDiscounts(token);
            discountList.value = response;
            return discountList.value;
        } catch (error) {
            console.error('Erro ao buscar descontos:', error);
        }
    }

    function setEditDiscount(discount) {
        id.value = discount.id;
        description.value = discount.description;
        discountPercentage.value = discount.discount_percentage;
        startDate.value = discount.start_date;
        endDate.value = discount.end_date;
        productId.value = discount.product_id;
    }

    function clearForm() {
        id.value = null;
        description.value = '';
        discountPercentage.value = '';
        startDate.value = '';
        endDate.value = '';
        productId.value = null;
    }

    return {
        description,
        discountPercentage,
        startDate,
        endDate,
        productId,
        id,
        discountList,
        createNewDiscount,
        editDiscountForm,
        getDiscountsList,
        setEditDiscount,
        clearForm
    };
});

