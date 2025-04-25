<template>
  <section class="w-full h-full custom-gradient flex flex-col lg:flex-row justify-center items-center px-6 lg:px-10 gap-10 lg:gap-x-20 ">
    <div class="flex flex-col justify-center gap-4 text-center lg:text-left">
      <h3 class="text-2xl lg:text-3xl font-semibold text-white">Pro.Beyond.</h3>
      <h1 class="text-5xl sm:text-6xl lg:text-8xl xl:text-9xl text-white tracking-tight">
        IPhone 14 <strong class="text-violet-800">Pro</strong>
      </h1>
      <p class="text-base sm:text-xl lg:text-2xl text-white py-2">
        Created to change everything for the better. For everyone.
      </p>
      <div class="flex justify-center lg:justify-start">
        <button class="text-white px-6 py-2 border-4 border-black rounded-xl hover:bg-violet-800">
          Shop Now
        </button>
      </div>
    </div>
    <div class="w-3/4 sm:w-2/3 lg:w-auto mt-6 lg:mt-0">
      <img src="@/assets/iphoneImage.svg" alt="iPhone 14 Pro image" class="w-full max-w-sm mx-auto lg:mx-0" />
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
