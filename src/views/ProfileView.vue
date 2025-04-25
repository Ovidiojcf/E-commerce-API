<script setup>
import Header from '@/components/HeaderComponent.vue';
import Address from '@/components/AddressComponent.vue';
import { useAuthStore } from '@/stores/auth';
import UserProfileCard from '@/components/UserProfileCard.vue';
const auth = useAuthStore();

</script>
<template>
    <Header />
    <div class="container mx-auto px-10 py-10 space-y-10">
        <!-- Perfil User-->
        <section class="flex justify-start">
            <UserProfileCard :name="auth.user?.name" :email="auth.user?.email" :avatarUrl="auth.user?.image_path" />
        </section>
    </div>
    <section class="container mx-auto px-10 py-10 space-y-10">
        <Address />
    </section>
</template>