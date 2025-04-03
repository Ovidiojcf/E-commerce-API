<script setup>
import Header from '@/components/HeaderComponent.vue';
import Footer from '@/components/FooterComponent.vue';
import ProductsGridComponent from '@/components/ProductsGridComponent.vue';
import Hero from '@/components/HeroComponent.vue';
import Grid from '@/components/GridComponent.vue';
import Category from '@/components/CategoryComponent.vue';
</script>

<template>
  <Header></Header>
  <main>
    <Hero/>
    <ProductsGridComponent/>
    <Category/>
    <Grid/>
  </main>
  <Footer></Footer>
</template>
