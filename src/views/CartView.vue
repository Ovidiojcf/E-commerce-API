<script setup>
import CartItemComponent from '@/components/CartItemComponent.vue';
import AddressSelector from '@/components/AddressSelector.vue';
import { useCreateCart } from '@/stores/cart';
import { useCreateOrder } from '@/stores/order';
import { computed, ref } from 'vue';
import Header from '@/components/HeaderComponent.vue';
import { useCreateCoupom } from '@/stores/coupom';

const coupomStore = useCreateCoupom();
const cartStore = useCreateCart();
const cartItems = computed(() => cartStore.cartItems || []);
const totalAmount = computed(() => cartStore.totalAmount || 0);
const cartHasItems = computed(() => cartItems.value.length > 0);
const groupedItems = computed(() => groupCartItems(cartItems.value));
const selectedAddressId = ref(null);
const orderStore = useCreateOrder();
const userCouponCode = ref('');
const selectedCouponId = ref(null);
const couponError = ref('');
const couponSuccess = ref('');

function groupCartItems(items) {
    const grouped = {};

    items.forEach(item => {
        if (!grouped[item.product_id]) {
            grouped[item.product_id] = {
                ...item,
                quantity: item.quantity,
                ids: [item.id],
            };
        } else {
            grouped[item.product_id].quantity += item.quantity;
            grouped[item.product_id].ids.push(item.id);
        }
    });

    return Object.values(grouped);
}

function incrementItem(item) {
    cartStore.incrementItemQuantity(item.id);
}

function decrementItem(item) {
    cartStore.decrementItemQuantity(item.id);
}

function removeItem(item) {
    cartStore.removeFromCart(item);
}

function handleAddressSelected(addressId) {
    selectedAddressId.value = addressId;
    console.log('Selected address:', addressId);
}

async function validateCoupon() {
    couponError.value = '';
    couponSuccess.value = '';

    if (!coupomStore.coupomList.length) {
        await coupomStore.getCouponsList();
    }

    const match = coupomStore.coupomList.find(c => c.code.toLowerCase() === userCouponCode.value.toLowerCase());

    if (match) {
        selectedCouponId.value = match.id;
        couponSuccess.value = `Coupon "${match.code}" applied successfully!`;
    } else {
        selectedCouponId.value = null;
        couponError.value = 'Invalid or expired coupon.';
    }
}

async function submitOrder() {
    if (!selectedAddressId.value) {
        alert('Please select a delivery address.');
        return;
    }

    if (groupedItems.value.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    const items = groupedItems.value.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity
    }));

    orderStore.address = selectedAddressId.value;

    try {
        const orderData = {
            address_id: selectedAddressId.value,
            items: items,
            coupon_id: selectedCouponId.value,
        };

        const response = await orderStore.createOrderSubmit(orderData);
        alert('Order placed successfully!');
        console.log('Order created:', response);
        await cartStore.initCart();
        clearCartInputs();
    } catch (error) {
        console.error('Error placing the order:', error);
        alert('Error placing the order. Please try again.');
    }
}

function clearCartInputs() {
    selectedAddressId.value = null;
}
</script>

<template>
    <Header />
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-2xl !font-bold mb-6">Your Cart</h1>

        <div v-if="cartHasItems">
            <div class="mb-4 pb-4 border-b">
                <h2 class="text-lg !font-semibold">Cart Items ({{ cartItems.length }})</h2>
            </div>
            <CartItemComponent v-for="item in groupedItems" :key="item.product_id" :item="item"
                @increment="incrementItem" @decrement="decrementItem" @remove="removeItem" />
            <div class="mb-4 pb-4 border-b">
                <h2 class="text-lg !font-semibold">Total: ${{ totalAmount.toFixed(2) }}</h2>
            </div>
            <div class="mb-6 mt-10">
                <h2 class="text-lg font-semibold mb-2">Discount Coupon</h2>
                <div class="flex gap-2 items-center">
                    <input v-model="userCouponCode" placeholder="Enter coupon code"
                        class="border border-gray-300 rounded-md px-3 py-2 w-full" />
                    <button @click="validateCoupon"
                        class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                        Validate
                    </button>
                </div>
                <p v-if="couponSuccess" class="text-green-600 mt-2">{{ couponSuccess }}</p>
                <p v-if="couponError" class="text-red-500 mt-2">{{ couponError }}</p>
            </div>
            <div class="mt-10 py-5">
                <AddressSelector @addressSelected="handleAddressSelected" />
            </div>
            <div class="mt-10">
                <h1 class="text-xl !font-bold !mb-2">Place Order</h1>
                <button @click="submitOrder" class="bg-indigo-600 text-white px-4 py-2 rounded-md">
                    Place Order
                </button>
            </div>
        </div>

        <div v-else class="flex flex-col justify-content items-center text-center gap-4 py-12">
            <h2 class="text-xl !font-semibold mb-4">Your cart is empty</h2>
            <p class="text-gray-400">Add products to your cart</p>
            <router-link to="/home"
                class="w-64 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Continue Shopping
            </router-link>
        </div>
    </div>
</template>