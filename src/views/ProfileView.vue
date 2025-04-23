<script setup>
import Header from '@/components/HeaderComponent.vue';
import Address from '@/components/AddressComponent.vue';
import { useAuthStore } from '@/stores/auth';
import UserProfileCard from '@/components/UserProfileCard.vue';
const auth = useAuthStore();

</script>
<template>
    <Header />
    <UserProfileCard 
    :name="auth.user?.name"
    :email="auth.user?.email"
    :avatarUrl="auth.user?.image_path"
    />
    <Address />
    <h2>{{ auth.user?.image_path }}</h2>
</template>