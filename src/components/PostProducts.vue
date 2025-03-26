<script setup>
import { useCreateProducts } from '@/stores/product';
const products = useCreateProducts();


async function sendProduct() {
    const result = await products.createProductForm;

    if(result.status === 201 ){
        alert('Produto Cadastrado com sucesso');
    }else{
        alert('Cadastro de produto falhou');
    }
}

function handleFileUpload (event){
    const file = event.target.files[0]
    if(file){
        products.img = file
        console.log("arquivo selecionado" , file)
    }
}

</script>

<template>
    <section class="flex flex-col">
        <div>
            <h3>Name: </h3>
            <input placeholder="product's name" v-model="products.name">
            <h3>Description: </h3>
            <input placeholder="product's name" v-model="products.description">
            <h3>Price: </h3>
            <input placeholder="product's name" v-model="products.price">
            <h3>Stock: </h3>
            <input placeholder="product's name" v-model="products.stock">
            <h3>Category ID: </h3>
            <input placeholder="product's name" v-model="products.category_id">
        </div>
        <div>
            <input type="file" @change="handleFileUpload">
        </div>
        <button @click="sendProduct()"></button>
    </section>
</template>