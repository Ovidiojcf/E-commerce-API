<script setup>
import { onMounted, computed } from 'vue';
import { useCreateCoupom } from '@/stores/coupom';

const coupons = useCreateCoupom();
const couponsList = computed(() => coupons.coupomList);

async function sendCoupon() {
    if (coupons.id) {
        const result = await coupons.editCouponForm();
        if (result) {
            alert('Cupom editado com sucesso');
            await coupons.getCouponsList();
            coupons.clearForm();
        } else {
            alert('Falha na edição do cupom');
        }
    } else {
        const result = await coupons.createNewCoupon();
        if (result) {
            alert('Cupom criado com sucesso');
            await coupons.getCouponsList();
            coupons.clearForm();
        } else {
            alert('Falha na criação do cupom');
        }
    }
}

async function editCoupon(coupon) {
    coupons.setEditCoupon(coupon);
    await coupons.getCouponsList();
}

onMounted(async () => {
    await coupons.getCouponsList();
});

</script>

<template>
    <section class="flex flex-col p-20 gap-5">
        <h2 class="text-lg font-bold text-black">{{ coupons.id ? 'Edit Coupon' : 'Create Coupon' }}</h2>

        <div class="flex flex-col gap-4 w-full max-w-md">
            <label class="font-bold text-black">Code:</label>
            <input v-model="coupons.coupomCode" placeholder="Coupon Code" class="border rounded px-3 py-2 text-black" />

            <label class="font-bold text-black">Discount (%):</label>
            <input v-model="coupons.coupomDiscount" type="number" placeholder="e.g., 10"
                class="border rounded px-3 py-2 text-black" />

            <label class="font-bold text-black">Start Date:</label>
            <input v-model="coupons.coupomStartDate" type="date" class="border rounded px-3 py-2 text-black" />

            <label class="font-bold text-black">End Date:</label>
            <input v-model="coupons.coupomEndDate" type="date" class="border rounded px-3 py-2 text-black" />

            <button @click="sendCoupon" class="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded mt-4">
                {{ coupons.id ? 'Update Coupon' : 'Create Coupon' }}
            </button>
        </div>
    </section>

    <section class="flex flex-col p-20 gap-5">
        <h2 class="font-bold text-black text-lg">Existing Coupons</h2>
        <div v-for="coupon in couponsList" :key="coupon.id"
            class="flex justify-between items-center border p-3 rounded shadow-sm">
            <div>
                <h3 class="font-bold text-black text-sm">Code: <span class="font-semibold text-gray-800">{{ coupon.code
                        }}</span></h3>
                <h3 class="font-bold text-black text-sm">Discount: <span class="font-semibold text-gray-800">{{
                    coupon.discount }}%</span></h3>
                <h3 class="font-bold text-black text-sm">Start: <span class="text-gray-700">{{ coupon.start_date
                        }}</span></h3>
                <h3 class="font-bold text-black text-sm">End: <span class="text-gray-700">{{ coupon.end_date }}</span>
                </h3>
            </div>
            <button @click="editCoupon(coupon)" class="text-blue-500 hover:text-blue-700">✏️ Edit</button>
        </div>
    </section>
</template>
