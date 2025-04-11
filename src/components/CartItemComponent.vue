<script setup>
import { computed } from 'vue';
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['increment', 'decrement', 'remove']);

const totalPrice = computed(() => {
    const price = Number(props.item?.unit_price ?? 0);
    const quantity = Number(props.item?.quantity ?? 0);
    return (price * quantity).toFixed(2);
});
</script>

<template>
    <div class="grid grid-cols-3 justify-items-stretch">
        <div class="w-3xs p-4 ">
            <img class="rounded-xl" :src="item.image" :alt="item.name">
        </div>
        <div class="flex items-center p-4">
            <h3 class="!font-bold text-black text-start">{{ item.name }}</h3>
            <span class="text-gray-500 text-sm">R$ {{ (item.unit_price ?? 0).toFixed(2) }}</span>
        </div>
        <div class="flex items-center gap-8">
            <div class="grid grid-cols-3">
                <button @click="$emit('decrement', item)"
                    class="w-8 h-8 flex items-center justify-center rounded-l-md border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    - </button>
                <div
                    class="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white text-gray-900">
                    {{ item.quantity }}</div>
                <button @click="$emit('increment', item)"
                    class="w-8 h-8 flex items-center justify-center rounded-r-md border border-gray-300 bg-gray-100 text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    + </button>
            </div>
            <div class="pl-5">
                <h2 class="!font-bold">R$ {{ totalPrice }}</h2>
            </div>
            <button
                class="w-auto h-10 flex justify-center text-lg items-center rounded-md bg-indigo-600 px-3 py-3  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                @click="$emit('remove', item)">Remover
            </button>
        </div>
    </div>
</template>