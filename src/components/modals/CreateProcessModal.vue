<template>
  <DialogTitle as="h1" class="text-2xl font-medium leading-6 text-gray-700">
    Novo Processo
  </DialogTitle>

  <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

  <div class="mt-3">
    <form class="space-y-2">
      <label for="processNumber"
        class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-0 focus-within:ring-blue-600">
        <span class="text-md font-medium text-gray-700"> Número do Processo </span>

        <input autocomplete="off" type="text" id="processNumber" placeholder="numero sem formatação"
          v-model="processNumber"
          class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
      </label>

      <label for="DefendantName"
        class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-0 focus-within:ring-blue-600">
        <span class="text-md font-medium text-gray-700"> Nome do réu </span>

        <input autocomplete="off" type="text" id="DefendantName" placeholder="nome" v-model="defendantName"
          class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
      </label>
      <label
        class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-0 focus-within:ring-blue-600">
        <span class="text-md font-medium text-gray-700"> Data inicial </span>

        <input autocomplete="off" type="date" v-model="dateStepUpdate"
          class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm" />
      </label>
      <div class="rounded-md border border-gray-200 px-3 py-2 max-h-full shadow-sm max-w-full">
        <Listbox v-model="selectedAttorneyType">
          <ListboxLabel class="text-md font-medium text-gray-700">Tipo de defensoria</ListboxLabel>
          <div class="relative mt-1">
            <ListboxButton
              class="relative w-full cursor-default rounded-sm bg-white py-2 pl-1 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span class="block">{{ getAttorneyTypeText(selectedAttorneyType) }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <span class="material-symbols-outlined text-gray-400 text-sm">
                  expand_more
                </span>
              </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
              leave-to-class="opacity-0">
              <ListboxOptions
                class=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption v-slot="{ active, selected }" v-for="processAttorneyType in processAttorneyTypes"
                  :key="processAttorneyType" :value="processAttorneyType" as="template">
                  <li :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]">
                    <span :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]">{{ getAttorneyTypeText(processAttorneyType) }}</span>
                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <span class="material-symbols-outlined text-sm">
                        done
                      </span>
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div class="rounded-md border border-gray-200 px-3 py-2 max-h-full shadow-sm max-w-full">
        <Listbox v-model="selectedSteps">
          <ListboxLabel class="text-md font-medium text-gray-700">Fase do Processo</ListboxLabel>
          <div class="relative mt-1">
            <ListboxButton
              class="relative w-full cursor-default rounded-sm bg-white py-2 pl-1 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span class="block">{{ getStepText(selectedSteps) }}</span>
              <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <span class="material-symbols-outlined text-gray-400 text-sm">
                  expand_more
                </span>
              </span>
            </ListboxButton>

            <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
              leave-to-class="opacity-0">
              <ListboxOptions
                class=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                <ListboxOption v-slot="{ active, selected }" v-for="steps in processSteps" :key="steps" :value="steps"
                  as="template">
                  <li :class="[
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]">
                    <span :class="[
                      selected ? 'font-medium' : 'font-normal',
                      'block truncate',
                    ]">{{ getStepText(steps) }}</span>
                    <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                      <span class="material-symbols-outlined text-sm">
                        done
                      </span>
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <label for="description"
        class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-0 focus-within:ring-blue-600">
        <span class="text-md font-medium text-gray-700"> Descrição </span>

        <textarea autocomplete="off" type="text" id="description" v-model="description" rows="4" cols="50"
          class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"></textarea>
      </label>
    </form>
  </div>

  <div class="mt-4 flex justify-end">
    <button type="button"
      class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      @click="closeModal">
      Cancelar
    </button>
    <button type="button"
      class="inline-flex ml-1 justify-center rounded-md border border-transparent bg-purple-100 px-4 py-2 text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
      @click.prevent="save">
      Salvar
    </button>
  </div>
</template>

<script setup lang="ts">
import { closeModal } from '@/composables/useModal';
import { DialogTitle } from '@headlessui/vue'
import { getAttorneyTypeText, getStepText } from '@/service/process.service';
import { ref } from '@vue/reactivity';
import { useProcessStore } from '@/stores/process';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { ProcessStepsTypeEnum, ProcessAttorneyTypeEnum, type DIProcess } from '@/models/process';

const selectedSteps = ref(ProcessStepsTypeEnum.Delegacia);
const processSteps = [
  ProcessStepsTypeEnum.Delegacia,
  ProcessStepsTypeEnum.MinisterioPublico,
  ProcessStepsTypeEnum.Citacao,
  ProcessStepsTypeEnum.ApresentacaoDefesa,
  ProcessStepsTypeEnum.ImpugnacaoMP,
  ProcessStepsTypeEnum.AudienciaInqueritoJudicial,
  ProcessStepsTypeEnum.MemoriaisMinisterioPublico,
  ProcessStepsTypeEnum.MemoriaisDefesa,
  ProcessStepsTypeEnum.Sentenca,
  ProcessStepsTypeEnum.Finalizado,
]

const selectedAttorneyType = ref(ProcessAttorneyTypeEnum.Public)
const processAttorneyTypes = [
  ProcessAttorneyTypeEnum.Private,
  ProcessAttorneyTypeEnum.Public
]

const processStore = useProcessStore()

const processNumber = ref<string>('')
const description = ref<string>('')
const defendantName = ref<string>('')
const dateStepUpdate = ref()

async function save() {
  try {
    const process = {
      processNumber: processNumber.value,
      stepsHistory: [{
        step: selectedSteps.value,
      }],
      description: description.value,
      defendantName: defendantName.value,
      attorneyType: selectedAttorneyType.value,
      dateStepUpdate: dateStepUpdate.value
    }
    console.log(process)
    await processStore.createCommonProcess(process)
    processStore.fetchCommonProcess()
    closeModal()
  } catch (e: any) {
    throw console.error("bad submit")
  }
}
</script>

<style scoped></style>
