<script setup>
import { defineProps,computed } from 'vue';

const props = defineProps({
    category: String,
    name: String,
    size: {type: String, default: "24px"},
    color: {type: String, default: "currrentColor"}
});

const iconPath = computed(() => new URL(`@/components/icons/${props.category}/${props.name}.svg`, import.meta.url).href);
</script>

<template>
    <img :src="iconPath" :alt="name" :width="size" :height="size" :style="{ fill: color }"/>
</template>