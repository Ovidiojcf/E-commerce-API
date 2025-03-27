<script setup>
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
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
                        <input
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
                        <img src="@/components/icons/actions/Favorites.svg" alt="Favorites" class="w-6 h-6">
                    </button>
                    <button aria-label="Cart" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                        <router-link to="/cart" class="hover:text-indigo-600 transition-colors">
                            <img src="@/components/icons/actions/Cart.svg" alt="Cart" class="w-6 h-6">
                        </router-link>
                    </button>

                    <div class="relative flex items-center gap-2">
                        <!-- Botão que ativa o dropdown -->
                        <button id="dropdown-button" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <img src="@/components/icons/actions/User.svg" alt="User" class="w-6 h-6">
                        </button>

                        <span v-if="auth.user" class="hidden md:block text-lg !font-semibold">
                            {{ auth.user.name }}
                        </span>

                        <!-- Dropdown -->
                        <div id="dropdown-menu"
                            class="absolute right-0 top-12 bg-white shadow-lg rounded-md w-48 hidden">
                            <ul class="py-2 text-gray-800">
                                <li>
                                    <a href="/" class="block px-4 py-2 hover:bg-gray-100">Profile</a>
                                </li>
                                <li>
                                    <a v-if="auth.user?.role === 'ADMIN'" href="/moderator"
                                        class="block px-4 py-2 hover:bg-gray-100">Moderator</a>
                                </li>
                                <li>
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

<script>
document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("dropdown-button");
    const menu = document.getElementById("dropdown-menu");

    button.addEventListener("click", function () {
        menu.classList.toggle("hidden");
    });

    // Fecha o dropdown ao clicar fora
    document.addEventListener("click", function (event) {
        if (!button.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.add("hidden");
        }
    });
});
</script>