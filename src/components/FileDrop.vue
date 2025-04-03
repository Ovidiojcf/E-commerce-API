<template>
    <div class="w-full h-full min-h-[100px]">
        <label v-bind="$attrs"
            class="relative transition-all ease-in-out duration-300 border-2 border-dashed border-gray-400 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer"
            :class="[entering ? 'bg-gray-200' : 'bg-gray-50', previewUrl ? 'border-indigo-500 bg-white' : '']"
            @drop.prevent="handleDrop" @dragenter.prevent="entering = true" @dragover.prevent="entering = true"
            @dragleave.prevent="entering = false">
            <!-- Preview da imagem -->
            <div v-if="previewUrl" class="w-45 h-45 relative">
                <img :src="previewUrl" class="w-full h-full object-contain" />
                <button @click.stop.prevent="clearFile()"
                    class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 focus:outline-none">
                    ×
                </button>
            </div>

            <!-- Conteúdo quando não há imagem -->
            <div v-else class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                    aria-hidden="true">
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="mt-4 flex text-sm text-gray-600">
                    <span
                        class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        Upload a file
                    </span>
                    <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                </p>
            </div>
            <!-- Input necessário para pegar a imagem, porém invisivel. Usa-se a classe opacity -->
            <input ref="fileInput" type="file" class="absolute top-0 left-0 w-30 h-30 opacity-0 cursor-pointer"
                accept="image/*" @input="handleInput">
        </label>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const events = ["dragenter", "dragleave", "dragover", "drop"];
const emit = defineEmits(["upload", "preview", "clear"]);

const entering = ref(false);
const previewUrl = ref(null);
const fileInput = ref(null);

// Prevenir comportamento padrão de arrastar e soltar no documento
onMounted(() => {
    events.forEach(event =>
        document.body.addEventListener(event, (e) => e.preventDefault())
    );
});

onUnmounted(() => {
    events.forEach(event =>
        document.body.removeEventListener(event, (e) => e.preventDefault())
    );

    // Limpar URL de objeto se existir
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
    }
});

// Manipular arquivos soltos na área
function handleDrop(e) {
    entering.value = false;
    const files = e.dataTransfer.files;

    if (files.length > 0 && isImageFile(files[0])) {
        processFile(files[0]);
        emit("upload", files[0]);
    }
}

// Manipular arquivos selecionados via input
function handleInput(e) {
    const files = e.target.files;

    if (files.length > 0 && isImageFile(files[0])) {
        processFile(files[0]);
        emit("upload", files[0]);
    }
}

// Verificar se o arquivo é uma imagem
function isImageFile(file) {
    return file.type.startsWith('image/');
}

// Processar o arquivo e criar preview
function processFile(file) {
    // Limpar preview anterior se existir
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
    }

    // Criar URL para preview
    previewUrl.value = URL.createObjectURL(file);
    emit("preview", previewUrl.value);
}

// Limpar arquivo e preview
function clearFile() {
    if (previewUrl.value) {
        URL.revokeObjectURL(previewUrl.value);
        previewUrl.value = null;
    }

    if (fileInput.value) {
        fileInput.value.value = '';
    }

    emit("clear");
}
</script>