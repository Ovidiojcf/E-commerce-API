<script setup>
import { Login } from '@/services/HttpService';
import { ref } from 'vue';

// Estado para controlar qual formulário mostrar
const isLoginForm = ref(true);

// Dados do formulário
const email = ref('');
const password = ref('');
const name = ref('');

// Função para alternar entre login e cadastro
function toggleForm() {
  isLoginForm.value = !isLoginForm.value;
  // Limpar os campos ao alternar
  email.value = '';
  password.value = '';
  name.value = '';
}

async function handleSubmit() {
  if (isLoginForm.value) {
    // Lógica de login
    const result = await Login({ email: email.value, password: password.value });
    if (result.status === 200) {
      return 1;
    } else {
      alert('Login falhou');
    }
  } else {
    // Lógica de cadastro (você precisará implementar o serviço de cadastro)
    alert(`Cadastro: Nome: ${name.value}, Email: ${email.value}, Senha: ${password.value}`);
    // Após cadastro bem-sucedido, você pode voltar para o formulário de login
    // isLoginForm.value = true;
  }
}
</script>

<template>
  <section class="rounded-lg grid grid-cols-2 flex-col justify-center px-6 py-12 lg:px-8">
    <!--Lado esquerdo da section-->
    <div class="bg-gray-400 rounded-l-lg p-8 grid justify-items-center">
      <img class="w-96" src="@/assets/cyber-logo-black.svg" alt="">
      <!--Fim da logo-->
      <div class="p-10">
        <h2 class="!font-bold text-4xl pb-3 ">Explore our exclusive collection of products.</h2>
        <p class="text-black text-lg text-justify">Thousands of carefully selected products are available at
          Cyber -
          the ideal destination for those seeking quality and variety for their daily needs.</p>
      </div>
      <!--Fim dos textos-->
    </div>
    <!--Lado direito da Seciton-->
    <div class="p-8 border-4 border-gray-400 rounded-r-lg">
      <div class="w-auto">
        <img class="w-auto h-15" src="@/assets/cyber-logo-black.svg" alt="Logo">
        <h2 class="mt-10 text-start text-2xl/9 !font-bold tracking-tight text-gray-900">
          {{ isLoginForm ? 'Sign in to your account' : 'Create your account' }}
        </h2>
      </div>
      <div class="mt-10 w-auto">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <!-- Campo Nome (apenas para cadastro) -->
          <div v-if="!isLoginForm">
            <label for="name" class="block text-sm/6 font-medium text-gray-900">Full name</label>
            <div class="mt-2">
              <input v-model="name" type="text" name="name" id="name" autocomplete="name" required
                class="block w-96 rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            </div>
          </div>

          <!-- Campo Email (para ambos) -->
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="email" type="email" name="email" id="email" autocomplete="email" required
                class="block w-96 rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            </div>
          </div>

          <!-- Campo Senha (para ambos) -->
          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="mt-2">
              <input v-model="password" type="password" name="password" id="password" autocomplete="current-password"
                required
                class="block w-96 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            </div>
          </div>

          <!-- Botão de submissão -->
          <div class="!mt-4">
            <button type="submit"
              class="flex w-96 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {{ isLoginForm ? 'Sign in' : 'Sign up' }}
            </button>
          </div>
        </form>

        <!-- Link para alternar entre login e cadastro -->
        <p class="mt-10 text-start text-sm/6 text-gray-500">
          {{ isLoginForm ? 'Not a member?' : 'Already have an account?' }}
          <a href="#" @click.prevent="toggleForm" class="font-semibold text-black hover:text-gray-500">
            {{ isLoginForm ? 'Sign-Up' : 'Sign-In' }}
          </a>
        </p>
      </div>
    </div>
  </section>
</template>