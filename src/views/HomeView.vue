<script setup>
import Header from '@/components/HeaderComponent.vue'
import Footer from '@/components/FooterComponent.vue';
import Product from '@/components/ProductComponent.vue';
import Hero from '@/components/HeroComponent.vue';
</script>

<template>
  <Header></Header>
  <main>
    <Product />
    <Hero/>
  </main>
  <Footer></Footer>
</template>
