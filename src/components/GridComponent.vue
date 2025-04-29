<template>
    <section class="w-full h-full grid gap-6 md:grid-cols-2 p-4">
        <!-- Main Highlight -->

        <div class="bg-purple-700 grid grid-cols-1 sm:grid-cols-2 items-center gap-4 rounded-lg">
            <img class="w-full p-6" src="@/assets/playstation5.svg" alt="PlayStation 5" />
            <div class="flex flex-col justify-center gap-4 p-3">
                <h2 class="text-3xl sm:text-5xl text-center font-bold text-white">PlayStation 5</h2>
                <!-- <p class="text-base sm:text-xl font-semibold text-justify">
                        Experience the incredible possibilities of gaming that go beyond the extraordinary on
                        PlayStation 5 and PS5 Digital Edition consoles.
                    </p> -->
                <button
                    class="self-center px-6 py-2 border-2 border-black font-bold rounded-xl hover:bg-white hover:text-purple-700 transition-all">
                    Shop Now
                </button>
            </div>
        </div>

        <!-- Apple Watch Highlight -->
        <div class="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 items-center gap-6 p-4 rounded-lg">
            <img class="w-full" src="@/assets/AppleWatchSeries6.svg" alt="Apple Watch Series 5" />
            <div class="flex flex-col justify-center gap-4 pr-2">
                <h2 class="text-3xl sm:text-5xl font-bold text-black">Apple Watch Series 5</h2>
                <!-- <p class="text-base sm:text-xl font-semibold text-justify">
                    All the essential features you need to get moving, stay connected, and track your health. watchOS 11
                    brings even more possibilities.
                </p> -->
                <button
                    class="self-center px-6 py-2 border-2 border-black font-bold rounded-xl hover:bg-blue-900 hover:text-white transition-all">
                    Shop Now
                </button>
            </div>
        </div>
    </section>
</template>