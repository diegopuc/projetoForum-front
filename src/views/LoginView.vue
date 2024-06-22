<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
        <img alt="Pattern"
          src="https://static.vecteezy.com/ti/vetor-gratis/p3/12912100-escritorio-de-advocacia-local-de-trabalho-com-contrato-legal-assinado-martelo-de-juiz-escalas-de-justica-e-livros-juridicos-conceito-de-lei-e-justica-ilustracao-moderna-de-isometrico-vetor.jpg"
          class="absolute inset-0 h-full w-full object-cover" />
      </aside>

      <main aria-label="Main"
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:py-12 lg:px-16 xl:col-span-6">
        <div class="max-w-xl lg:max-w-3xl">
          <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Bem-vindos ao projeto UTIP ⚖
          </h1>

          <form class="mt-8 grid grid-cols-6 gap-6" @submit.prevent="handleSubmit">

            <div class="col-span-6">
              <label for="Email" class="block text-sm font-medium text-gray-700">
                Email
              </label>

              <input type="email" name="email" v-model="email"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>

            <div class="col-span-6">
              <label for="Password" class="block text-sm font-medium text-gray-700">
                Senha
              </label>

              <input type="password" name="password" v-model="password"
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm" />
            </div>

            <div class="col-span-6">
              <label for="MarketingAccept" class="flex gap-4">
                <input type="checkbox" id="MarketingAccept" name="marketing_accept"
                  class="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm" />

                <span class="text-sm text-gray-700">
                  Gostaria de receber emails sobre as futuras atualizações
                </span>
              </label>
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                Login
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, type PropType, onMounted, computed } from 'vue';
import type { DIEmailStrategy } from '@/models/email.strategy.dto';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';
import { useVisibleStore } from '@/stores/visible';


const visibleStore = useVisibleStore();
visibleStore.toggleVisibilityOff();
const LoginForm = defineProps({
  onSuccess: {
    type: Function as PropType<() => void>,
    required: false,
  },
} as const);

const authStore = useAuthStore();

const email = ref('');
const password = ref('');

const handleSubmit =
  async (): Promise<void> => {
    try {
      const user: DIEmailStrategy = { email: email.value, password: password.value };
      await authStore.login(user);
      router.push('/');
       //console.log('pushed');
      LoginForm.onSuccess?.();
    } catch (e: any) {
      // console.log(e, 'not allowed')
    }
  };

</script>

<style scoped></style>