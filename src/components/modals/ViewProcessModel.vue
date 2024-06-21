<script setup lang="ts">
import { ProcessAttorneyTypeEnum, type IProcess } from '@/models/process';
import { closeModal } from '@/composables/useModal';
import { getStepText, formatDate, getStatusText, getAttorneyTypeText, getColorForProcessStatus } from '@/service/process.service';
import { DialogTitle } from '@headlessui/vue'
import { computed, ref } from '@vue/reactivity';
import { watchEffect } from 'vue';
import HistoryCard from "../HistoryCard.vue"
import { useClipboard } from '@vueuse/core'
const props = defineProps<{
  process: IProcess
}>()
const baseUrl = 'https://utip.vercel.app/client/trial'
const generatedUrl = computed(() => `${baseUrl}?id=${props.process._id}`);
const tagColors = ref<string>()
const process = computed(() => props.process);

const { copy } = useClipboard();

const copyUrlToClipboard = () => {
  copy(generatedUrl.value);
};

watchEffect(() => {
  tagColors.value = getColorForProcessStatus(props.process.status)
  console.log(tagColors.value)
})

const tab = ref<'one' | 'two'>('one')
const selectTab = (selected: 'one' | 'two') => {
  tab.value = selected
}
const baseClass = 'inline-block p-4 rounded-t-lg focus:outline:none'
const activeClass = 'text-blue-600 bg-gray-100'
const inactiveClass = 'hover:text-gray-600 hover:bg-gray-50'
const getHistoryCardProps = (item: any, i: number) => ({
  step: item.step,
  startDate: item.startDate,
  finalDate: item.finalDate,
  isPrivateAttorney: item.attorneyType === ProcessAttorneyTypeEnum.Private,
  phaseCounter: i === process.value.stepsHistory.length - 1 ? process.value.daysSinceStepUpdate : item.phaseDaysCounter,
  lastStatus: i === process.value.stepsHistory.length - 1 ? process.value.status : item.lastStatus,
  statusColor: i === process.value.stepsHistory.length - 1 ? getColorForProcessStatus(process.value.status, false) : getColorForProcessStatus(item.lastStatus, false),
})
</script>
<template>
  <DialogTitle as="h1" class="text-2xl font-medium leading-6 text-gray-700">
    Processo: {{ process.processNumber }}
  </DialogTitle>

  <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

  <div class="flex flex-wrap justify-between mt-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
    <div>
      <button @click="selectTab('one')" class="first-tab mr-1"
        :class="[baseClass, tab === 'one' ? activeClass : inactiveClass]">Informações</button>
      <button @click="selectTab('two')"
        :class="[baseClass, tab === 'two' ? activeClass : inactiveClass]">Histórico</button>
    </div>
    <button @click="copyUrlToClipboard()"
      class="rounded-t-lg bg-gray-50 px-4 text-xs text-gray-600 hover:bg-gray-50 hover:text-blue-600 sm:mt-0 sm:w-auto">
      <span class="material-symbols-outlined">
        content_copy
      </span>
    </button>
  </div>

  <div class="mt-3 space-y-2" v-if="tab === 'one'">
    <div class="rounded-md border border-gray-200 px-3 py-2 shadow-sm">
      <div class="text-md font-medium text-gray-700">Fase</div>
      <div class="mt-1 w-full text-sm">{{ getStepText(process.stepsHistory?.[process.stepsHistory.length - 1].step) }}
      </div>
    </div>
    <div class="rounded-md border border-gray-200 px-3 py-2 shadow-sm">
      <div class="text-md font-medium text-gray-700">Réu</div>
      <div class="mt-1 w-full text-sm">{{ process.defendantName }}</div>
    </div>
    <div class="rounded-md border border-gray-200 px-3 py-2 shadow-sm">
      <div class="text-md font-medium text-gray-700">Advogado(a)</div>
      <div class="mt-1 w-full text-sm">{{ getAttorneyTypeText(process.attorneyType) }}</div>
    </div>
    <div class="rounded-md border border-gray-200 px-3 py-2 shadow-sm">
      <div class="text-md font-medium text-gray-700"> Status </div>
      <div class="mt-1 w-full text-sm"><span :class="[tagColors]">{{ getStatusText(process.status) }}</span></div>
    </div>
    <div class="rounded-md border border-gray-200 px-3 py-2 shadow-sm">
      <div class="text-md font-medium text-gray-700">Contador da Fase(dias)</div>
      <div class="mt-1 w-full text-sm">{{ process.daysSinceStepUpdate || '---' }}</div>
    </div>
    <div class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm">
      <div class="text-md font-medium text-gray-700"> Data de início da Fase Atual </div>
      <div class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm">
        {{ formatDate(process.dateStepUpdate?.toString()) }}</div>
    </div>
    <div class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm">
      <div class="text-md font-medium text-gray-700"> Data do encarceramento </div>
      <div class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
        v-if="process.incarcerationDate">
        {{ formatDate(process.incarcerationDate.toString()) }}</div>
    </div>
    <div class="block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm">
      <div class="text-md font-medium text-gray-700"> Descrição </div>
      <textarea :readonly="true" autocomplete="off" type="text" id="description"
        v-if="process.description != null || process.description != undefined" v-model="process.description" rows="4"
        cols="50"
        class="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"></textarea>
    </div>
  </div>

  <div v-if="tab === 'two'" class="p-4 mt-1">
    <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
      <div class="flex md:w-[28rem] space-x-2 margin justify-center">
        <div class="tag bg-blue-100 w-fit text-blue-700">Tempo máximo: 109 dias </div>
        <div v-if="process.incarcerationDaysCount" class="tag w-fit"
          :class="process.incarcerationDaysCount > 109 ? `text-red-700 bg-red-100` : `text-blue-700 bg-blue-100`">Tempo
          preso:
          {{ process.incarcerationDaysCount }} {{ process.incarcerationDaysCount >= 1 ?
            'dias' : 'dia' }}
        </div>
      </div>
      <template v-for="(item, i) in process.stepsHistory">
        <HistoryCard v-bind="getHistoryCardProps(item, i)" />
      </template>
    </div>
  </div>

  <div class="mt-4 flex justify-end">
    <button type="button"
      class="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
      @click="closeModal">
      Fechar
    </button>
  </div>
</template>
<style>
.first-tab:focus {
  outline: none;
  box-shadow: none;
}

.margin {
  margin-bottom: 20px;
}
</style>
