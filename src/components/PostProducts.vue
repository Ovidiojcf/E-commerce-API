<script setup>
import { ref } from 'vue';

//Variaveis para capturar os campos sobre o produto
const name = ref('')
const description = ref('')
const price = ref('')
const stock = ref('')
const category_id = ref('')


</script>

<template>
    <section class="flex flex-col">
        <div>
            <h3>Name: </h3>
            <h3>Description: </h3>
            <h3>Price: </h3>
            <h3>Stock: </h3>
            <h3>Category ID: </h3>
        </div>
        <div>
            <img src="" alt="">
        </div>
    </section>
</template>