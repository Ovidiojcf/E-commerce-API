<template>
    <header class="flex justify-center gap-8 p-6 bg-white text-black text-xl xl:flex justify-center">
        <div>
            <img  class="w-30" src="@/assets/cyber-logo-black.svg" alt="">
        </div>
        <div class=" h-auto">
            <input class="bg-gray-200  w-auto rounded-xl p-2 placeholder:text-black" placeholder="Search for a Product"
                type="text" name="search" />
        </div>
        <div class="flex items-center gap-4">
            <router-link to="">Home</router-link>
            <router-link to="">About</router-link>
            <router-link to="">Contact Us</router-link>
            <router-link to="">Blog</router-link>
        </div>
        <div class="flex flex-row w-12 h-12 gap-8">
            <img src="@/components/icons/actions/Favorites.svg">
            <img src="@/components/icons/actions/Cart.svg">
            <img src="@/components/icons/actions/User.svg">
        </div>
    </header>
</template>