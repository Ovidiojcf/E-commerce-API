<template>
    <section class="w-full h-full custom-gradient flex flex-row justify-center px-10 gap-x-70">
        <div class="flex flex-col justify-center gap-1">
            <h3 class="text-3xl !font-semibold text-white">Pro.Beyond.</h3>
            <h1 class="text-9xl text-white tracking-tight">IPhone 14 <strong class="text-violet-800">Pro</strong></h1>
            <p class="text-2xl text-white py-2">Created to change everything for the better. For everyone</p>
            <button class="w-fit text-white px-7.5 py-2.5 border-4 border-black rounded-xl hover:bg-violet-800">Shop Now</button>
        </div>
        <div>
            <img src="@/assets/iphoneImage.svg" alt="">
        </div>
    </section>
</template>

<style>
.custom-gradient {
  background: linear-gradient(
    to top,
    #8e8e8e 30%,
    #8f8f8f 30%,
    #707070 45%,
    #707070 50%,
    #707070 60%,
    #5f5f5f 75%,
    #2c2c2c 100%
  );
}
</style>