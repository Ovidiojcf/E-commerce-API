import { defineStore } from "pinia";
import { ref } from "vue";
import { createCoupon, getCoupons, editCoupon } from "@/services/HttpService";
import { useAuthStore } from "@/stores/auth";

export const useCreateCoupom = defineStore('coupom', () => {
    const id = ref(null); // api retorna ele 
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
                discount_percentage: coupomDiscount.value,
                start_date: coupomStartDate.value,
                end_date: coupomEndDate.value
            };
            const result = await createCoupon(newCoupon, token);
            return result;
        } catch (error) {
            console.error('Erro ao criar cupom:', error);
        }
    }

    async function editCouponForm() {
        try {
          const couponData = {
            code: coupomCode.value,
            discount_percentage: coupomDiscount.value,
            start_date: coupomStartDate.value,
            end_date: coupomEndDate.value,
          };
          const result = await editCoupon(id.value, couponData, token);
          return result;
        } catch (error) {
          console.error("Erro ao editar cupom:", error);
        }
    }

    async function getCouponsList() {
        try {
            const response = await getCoupons(token);
            coupomList.value = response;
            return coupomList.value;
        } catch (error) {
            console.error('Erro ao buscar cupons existentes:', error);
        }
    }
    function setEditCoupon(coupon) {
        id.value = coupon.id;
        coupomCode.value = coupon.code;
        coupomDiscount.value = coupon.discount;
        coupomStartDate.value = coupon.start_date;
        coupomEndDate.value = coupon.end_date;
      }
    
      function clearForm() {
        id.value = null;
        coupomCode.value = '';
        coupomDiscount.value = '';
        coupomStartDate.value = '';
        coupomEndDate.value = '';
      }

    return {
        coupomCode,
        coupomDiscount,
        coupomStartDate,
        coupomEndDate,
        createNewCoupon,
        getCouponsList,
        editCouponForm,
        setEditCoupon,
        clearForm,
        id,
        coupomList
    };
});