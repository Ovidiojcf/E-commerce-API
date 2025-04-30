<script setup>
import { Login, Register, createCart } from '@/services/HttpService';
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCreateCart } from '@/stores/cart';

const auth = useAuthStore();
const router = useRouter();
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

async function enviar() {
  try {
    if (isLoginForm.value) {
      const result = await Login({ email: email.value, password: password.value });

      if (result.status === 200) {
        alert('Login successful');
        auth.saveUser(result.data);
        router.push('/home');
      } else {
        alert('Login failed');
      }
    } else {
      const result = await Register({
        name: name.value,
        email: email.value,
        password: password.value
      });

      if (result.status === 201 || result.status === 200) {
        alert('Registration successful!');
        const loginResult = await Login({ email: email.value, password: password.value });
        if (loginResult.status === 200) {
          auth.saveUser(loginResult.data);
          const cartResult = await createCart(auth.id, auth.token);
          router.push('/home');
          return console.log(cartResult, "Cart created successfully");
        }
      } else {
        alert('Registration failed: ' + (result.data?.message || 'Unknown error'));
      }
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred: ' + (error.message || 'Unknown error'));
  }
}
</script>

<template>
  <section class="min-h-screen flex items-center justify-center  px-6 py-12 lg:px-8">
    <div class="grid grid-cols-1 lg:grid-cols-2 rounded-lg overflow-hidden shadow-lg w-full max-w-5xl">
      <!-- Lado esquerdo -->
      <div class="bg-gray-400 p-8 flex flex-col items-center justify-center">
        <img class="w-60 md:w-80" src="@/assets/cyber-logo-black.svg" alt="Cyber Logo">
        <div class="mt-8 text-center">
          <h2 class="font-bold text-2xl md:text-4xl mb-4">Explore our exclusive collection of products.</h2>
          <p class="text-black text-base md:text-lg">Thousands of carefully selected products are available at Cyber — the ideal destination for those seeking quality and variety for their daily needs.</p>
        </div>
      </div>

      <!-- Lado direito -->
      <div class="p-8 border-t-4 border-gray-400 lg:border-t-0 lg:border-l-4 bg-white flex flex-col justify-center">
        <div class="max-w-md w-full mx-auto">
          <div class="flex flex-col items-center justify-center">
            <img class="w-auto h-12 mx-auto lg:mx-0" src="@/assets/cyber-logo-black.svg" alt="Logo">
            <h2 class="mt-10 text-2xl font-bold tracking-tight text-gray-900 text-center lg:text-left">
              {{ isLoginForm ? 'Sign in to your account' : 'Create your account' }}
            </h2>
          </div>

          <!-- Aqui você continua com o seu formulário normalmente -->
          <form class="mt-10 space-y-6" @submit.prevent="enviar">
            <!-- Campo Nome (apenas para cadastro) -->
          <div v-if="!isLoginForm">
            <label for="name" class="block text-sm/6 font-medium text-gray-900">Full name</label>
            <div class="mt-2">
              <input v-model="name" type="text" name="name" id="name" autocomplete="name" required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            </div>
          </div>

          <!-- Campo Email (para ambos) -->
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <input v-model="email" type="email" name="email" id="email" autocomplete="email" required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-lg text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            </div>
          </div>

          <!-- Campo Senha (para ambos) -->
          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="mt-2">
              <input v-model="password" type="password" name="password" id="password" autocomplete="current-password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            </div>
          </div>

          <!-- Botão de submissão -->
          <div class="!mt-4">
            <button type="submit"
              class="block w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {{ isLoginForm ? 'Sign in' : 'Sign up' }}
            </button>
          </div>
          </form>

          <p class="mt-6 text-center text-sm text-gray-500">
            {{ isLoginForm ? 'Not a member?' : 'Already have an account?' }}
            <a href="#" @click.prevent="toggleForm" class="font-semibold text-indigo-600 hover:text-indigo-500">
              {{ isLoginForm ? 'Sign-Up' : 'Sign-In' }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>