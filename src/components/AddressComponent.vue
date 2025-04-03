<script setup>

</script>

<template>
    <section class="flex flex-row p-20 gap-5">
        <div class="flex flex-col gap-4 w-full max-w-sm">
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Street: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your street">
            </div>
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Number: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your house's number">
            </div>
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Zip: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type you ZIP Code">
            </div>
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">City: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your City">
            </div>
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">State: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your State">
            </div>
            
            <div class="flex flex-col gap-2">
                <label class="!font-bold text-lg text-black">Country: </label>
                <input
                    class="shadow appearance-none border rounded w-64 py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Type your Country">
            </div>
            <button class="w-auto h-auto flex justify-center text-lg rounded-md bg-indigo-600 px-3 py-3  font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Create Address
            </button>
        </div>
    </section>
</template>