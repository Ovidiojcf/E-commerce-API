<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const showDropdown = ref(false);
const search = ref("");
const router = useRouter();


const toggleDropDown = () => {
    showDropdown.value = !showDropdown.value;
};

const closeDropdown = (event) => {
    if (!event.target.closest("#dropdown-container")) {
        showDropdown.value = false;
    }
};

const handleSearch = () => {
    if (search.value.trim() !== "") {
        router.push(`/search/${search.value.trim()}`);
        search.value = "";
    }
};


// Adiciona e remove o event listener corretamente
onMounted(() => {
    document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
    document.removeEventListener("click", closeDropdown);
});
</script>

<template>
    <header class="w-full bg-white text-black py-4 px-6 shadow-sm">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row items-center justify-center gap-6">
                <!-- Logo -->
                <div class="flex-shrink-0">
                    <img class="h-10 w-auto" src="@/assets/cyber-logo-black.svg" alt="Cyber Logo">
                </div>

                <!-- Search Bar -->
                <div class="w-full md:w-64 lg:w-80 mt-4 md:mt-0">
                    <div class="relative">
                        <input v-model="search" @keyup.enter="handleSearch"
                            class="w-full bg-gray-100 rounded-lg py-2 px-4 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="Search for a Product" type="text" name="search" aria-label="Search" />
                        <span class="absolute right-3 top-2.5 text-gray-400">
                            <img src="@/components/icons/actions/Search.svg" alt="Search" class="w-5 h-5">
                        </span>
                    </div>
                </div>

                <nav class="mt-4 md:mt-0">
                    <ul class="flex items-center gap-6">
                        <li>
                            <router-link to="/home" class="hover:text-indigo-600 transition-colors">Home</router-link>
                        </li>
                        <li>
                            <router-link to="/login" class="hover:text-indigo-600 transition-colors">Login</router-link>
                        </li>
                        <li>
                            <router-link to="/home" class="hover:text-indigo-600 transition-colors">Contact
                                Us</router-link>
                        </li>
                        <li>
                            <router-link to="/home" class="hover:text-indigo-600 transition-colors">Blog</router-link>
                        </li>
                    </ul>
                </nav>

                <div class="flex items-center gap-5 mt-4 md:mt-0">
                    <button aria-label="Favorites" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <router-link to="/favorites">
                            <img src="@/components/icons/actions/Favorites.svg" alt="Favorites" class="w-6 h-6">
                        </router-link>
                    </button>
                    <button aria-label="Cart" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <router-link to="/cart">
                            <img src="@/components/icons/actions/Cart.svg" alt="Cart" class="w-6 h-6">
                        </router-link>
                    </button>

                    <div id="dropdown-container" class="relative flex items-center gap-2">
                        <!-- Botão que ativa o dropdown -->
                        <button @click="toggleDropDown" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <img src="@/components/icons/actions/User.svg" alt="User" class="w-6 h-6">
                        </button>

                        <span v-if="auth.user" class="hidden md:block text-lg !font-semibold">
                            {{ auth.user.name }}
                        </span>

                        <!-- Dropdown -->
                        <div v-show="showDropdown" class="absolute right-0 top-12 bg-white shadow-lg rounded-md w-48">
                            <ul class="py-2 text-gray-800">
                                <li>
                                    <a href="/profile" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
                                </li>
                                <li>
                                    <a v-if="auth.user?.role == 'ADMIN'" href="/moderator"
                                        class="block px-4 py-2 hover:bg-gray-100">Moderator</a>
                                </li>
                                <li>
                                    <router-link to="/login"><a
                                            class="block px-4 py-2 hover:bg-gray-100">Login</a></router-link>
                                </li>
                                <li v-if="auth.user && Object.keys(auth.user).length">
                                    <button @click="auth.logout"
                                        class="block px-4 py-2 hover:bg-red-100 text-red-600">Logout</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </header>
</template>
