<template>
    <section class="w-full h-full custom-gradient flex flex-row justify-center px-10 gap-x-70">
        <div class="flex flex-col justify-center gap-1">
            <h3 class="text-3xl !font-semibold text-white">Pro.Beyond.</h3>
            <h1 class="text-9xl text-white">IPhone 14 <strong class="text-violet-800">Pro</strong></h1>
            <p class="text-2xl text-white py-2">Created to change everything for the better. For everyone</p>
            <button class="w-fit text-white px-7.5 py-2.5 border-4 border-gray-700 rounded-xl hover:bg-violet-800 text-black">Shop Now</button>
        </div>
        <div>
            <img src="@/assets/iphoneImage.svg" alt="">
        </div>
    </section>
</template>

<style>
.custom-gradient {
  background: linear-gradient(
    to bottom,
    #FFFFFF 0%,
    #C0C0C0 10%,
    #C0C0C0 30%,
    #C0C0C0 30%,
    #A0A0A0 45%,
    #808080 60%,
    #909090 75%,
    #909090 100%
  );
}
</style>