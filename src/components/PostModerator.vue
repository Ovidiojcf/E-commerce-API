<script setup>
import { ref } from 'vue';
import { useModeratorStore } from '@/stores/moderator';

const name = ref('');
const email = ref('');
const password = ref('');
const store = useModeratorStore();

async function handleSubmit() {
    const result = await store.createModerator({ name: name.value, email: email.value, password: password.value });
    if (result) {
        alert('Moderator User Created Successfully');
        name.value = '';
        email.value = '';
        password.value = '';
    } else {
        alert('Error creating moderator user');
    }
}
</script>

<template>
    <div class="p-8 flex flex-col gap-4">
        <h2 class="text-xl font-bold text-gray-700">Create Moderator</h2>

        <input v-model="name" type="text" placeholder="Name"
            class="border rounded px-3 py-2 focus:outline-none focus:ring w-full max-w-md" />

        <input v-model="email" type="email" placeholder="Email"
            class="border rounded px-3 py-2 focus:outline-none focus:ring w-full max-w-md" />

        <input v-model="password" type="password" placeholder="Password"
            class="border rounded px-3 py-2 focus:outline-none focus:ring w-full max-w-md" />

        <button @click="handleSubmit"
            class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-500 w-fit">
            Criar Moderador
        </button>
    </div>
</template>
