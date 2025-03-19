<template>
    <header class="flex justify-center items-center p-6 bg-white text-black">
        <div class="basis-3xs">
            <img src="@/assets/cyber-logo-black.svg" alt="">
        </div>
        <div class="basis-3xs h-auto">
            <input class="bg-gray-200  w-auto rounded-xl p-2 placeholder:text-black" placeholder="Search for a Product"
                type="text" name="search" />
        </div>
        <div class="basis-3xs flex gap-4">
            <router-link to="">Home</router-link>
            <router-link to="">About</router-link>
            <router-link to="">Contact Us</router-link>
            <router-link to="">Blog</router-link>
        </div>
        <div class="basis-3xs flex flex-row w-8 h-8 gap-8">
            <img src="@/components/icons/actions/Favorites.svg">
            <img src="@/components/icons/actions/Cart.svg">
            <img src="@/components/icons/actions/User.svg">
        </div>
    </header>
</template>