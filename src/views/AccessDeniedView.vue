<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <img
        src="@/assets/nfc-lock.svg"
        alt="Access Denied"
        class="w-64 h-64 text-purple-700 mb-4"
      />
      <h1 class="text-3xl font-bold text-purple-700">Acesso Negado</h1>
      <p class="text-gray-600 mt-2 !mb-6">Você não tem permissão para acessar esta página.</p>
  
      <router-link
        to="/home"
        class="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
      >
        Voltar para Home
      </router-link>
    </div>
  </template>
  