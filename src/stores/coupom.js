import { defineStore } from "pinia";
import { ref } from "vue";
import { createCoupon } from "@/services/HttpService";
import { useAuthStore } from "@/stores/auth";

export const useCreateCoupom = defineStore('coupom', () => {
    const coupomCode = ref(null);
    const coupomDiscount = ref(null);
    const coupomStartDate = ref(null);
    const coupomEndDate = ref(null);

    const coupomList = ref([]);

    const token = useAuthStore().token;

    async function createNewCoupon() {
        try {
            const newCoupon = {
                code: coupomCode.value,
                discount: coupomDiscount.value,
                start_date: coupomStartDate.value,
                end_date: coupomEndDate.value
            };
            const result = await createCoupon(newCoupon, token);
            return result;
        } catch (error) {
            console.error('Erro ao criar cupom:', error);
        }
    }

    async function getCoupons() {
        try {
            const response = await getCoupons(token);
            coupomList.value = response;
        } catch (error) {
            console.error('Erro ao buscar cupons existentes:', error);
        }
    }

    return {
        coupomCode,
        coupomDiscount,
        coupomStartDate,
        coupomEndDate,
        createNewCoupon,
        getCoupons,
        coupomList
    };
});