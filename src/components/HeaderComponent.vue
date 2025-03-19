<script>
import BaseIcon from './BaseIcon.vue';
</script>

<template>
    <header class="bg-white h-32 flex flex-row ">
        <div class="basis-3xs">
            <img src="@/assets/cyber-logo-black.svg" alt="">
        </div>
        <div class="basis-3xs">
            <p>Barra de navegação</p>
        </div>
        <div class="basis-3xs">
            <p>links de navegação</p>
        </div>
        <div class="basis-3xs">
            <BaseIcon category="actions" name="Favorites" size="24px" color="red" />
            <BaseIcon category="actions" name="Favorites" size="24px" color="red" />
            <BaseIcon category="actions" name="Favorites" size="24px" color="red" />
        </div>
    </header>
</template>