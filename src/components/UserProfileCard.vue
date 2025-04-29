<script setup>
import { useAuthStore } from '@/stores/auth';
import { defineProps, ref, watch } from 'vue';
import FileDrop from '@/components/FileDrop.vue';
import { editUser, editUserImage, getUser } from '@/services/HttpService';


const props = defineProps({
    name: String,
    email: String,
    avatarUrl: String
})

const auth = useAuthStore();
const isEditing = ref(false);
const nameInput = ref(props.name);
const emailInput = ref(props.email);
const previewImage = ref(null);
const selectedFile = ref(null);

watch(() => props.name, val => nameInput.value = val);
watch(() => props.email, val => emailInput.value = val);


function getImg(imagePath) {
    const baseUrl = 'http://35.196.79.227:8000';
    return `${baseUrl}${imagePath}`;
}

async function saveChanges() {
    try {
        // Atualiza dados textuais
        await editUser({ name: nameInput.value, email: emailInput.value }, auth.token);

        // Atualiza imagem se houver novo arquivo
        if (selectedFile.value) {
            await editUserImage(selectedFile.value, auth.token);
        }

        // Atualiza store com novo usuário da API
        const updated = await getUser(auth.token);
        auth.user = updated;

        isEditing.value = false;
    } catch (error) {
        console.error("Erro ao salvar alterações", error);
    }
}

function onUpload(file) {
    selectedFile.value = file;
}

function onPreview(url) {
    previewImage.value = url;
}

function onClear() {
    selectedFile.value = null;
    previewImage.value = null;
}


function cancelEdit() {
    nameInput.value = props.name;
    emailInput.value = props.email;
    selectedFile.value = null;
    previewImage.value = null;
    isEditing.value = false;
}
</script>

<template>
    <div
        class="flex flex-row w-full max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden gap-6 p-6 text-center">
        <div class="w-30 h-30">
            <FileDrop v-if="isEditing" 
                @upload="onUpload" 
                @preview="onPreview" 
                @clear="onClear" />
            <img v-else 
                :src="getImg(avatarUrl)" 
                alt="Foto do usuário"
                class="w-full h-full rounded-full object-cover border-2 border-gray-300" />
        </div>

        <div class="flex flex-col justify-center items-start">
            <template v-if="isEditing">
                <input v-model="nameInput" class="mb-2 px-2 py-1 rounded" />
                <input v-model="emailInput" class="px-2 py-1 rounded" />
                <div class="mt-4 space-x-2">
                    <button @click="saveChanges" class="px-3 py-1 bg-green-500 text-white rounded">Salvar</button>
                    <button @click="cancelEdit" class="px-3 py-1 bg-gray-500 text-white rounded">Cancelar</button>
                </div>
            </template>
            <template v-else>
                <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ name }}</h2>
                <p class="text-gray-600 dark:text-gray-300">{{ email }}</p>
                <button @click="isEditing = true" class="mt-4 px-3 py-1 bg-blue-500 text-white rounded">Editar</button>
            </template>
        </div>
    </div>
</template>
