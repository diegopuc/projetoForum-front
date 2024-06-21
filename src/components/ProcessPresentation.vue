<script setup lang="ts">
import type { IProcess } from '@/models/process';
import { getStepText, formatDate, getStatusText, getAttorneyTypeText, getColorForProcessStatus, getHistoryCardProps } from '@/service/process.service';
import { computed, ref } from '@vue/reactivity';
import { watchEffect } from 'vue';
import HistoryCard from "../components/HistoryCard.vue"

const props = defineProps<{
  process: IProcess
}>()
const tagColors = ref<string>()
const process = computed(() => props.process);

watchEffect(() => {
  tagColors.value = getColorForProcessStatus(props.process.status)
})

const tab = ref<'one' | 'two'>('one')
const selectTab = (selected: 'one' | 'two') => {
  tab.value = selected
}
const baseClass = 'inline-block p-4 rounded-t-lg focus:outline:none'
const activeClass = 'text-blue-600 bg-gray-200'
const inactiveClass = 'hover:text-gray-600 hover:bg-gray-200'
</script>
<template>
  <h1 class="lg:text-3xl md:text-2xl text-xl pl-2 md:pl-0 font-medium leading-6 text-gray-700">
    Processo: {{ process.processNumber }}
  </h1>

  <div class="flex flex-wrap mt-2 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
    <button @click="selectTab('one')" class="first-tab mr-1"
      :class="[baseClass, tab === 'one' ? activeClass : inactiveClass]">Informações</button>
    <button @click="selectTab('two')" :class="[baseClass, tab === 'two' ? activeClass : inactiveClass]">Histórico</button>
  </div>

  <div class="mt-3 space-y-4" v-if="tab === 'one'">
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
  </div>

  <div v-if="tab === 'two'" class="p-4 mt-1">
    <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
      <div class="flex md:w-[35rem] lg:w-[97rem] space-x-2 margin justify-center">
        <div class="tag bg-blue-100 w-fit text-blue-700">Tempo máximo: 109 dias </div>
        <div v-if="process.incarcerationDaysCount" class="tag w-fit"
          :class="process.incarcerationDaysCount > 109 ? `text-red-700 bg-red-100` : `text-blue-700 bg-blue-100`">Tempo
          preso:
          {{ process.incarcerationDaysCount }} {{ process.incarcerationDaysCount >= 1 ?
            'dias' : 'dia' }}
        </div>
      </div>
      <template v-for="(item, i) in process.stepsHistory">
        <HistoryCard v-bind="getHistoryCardProps(item, i, process)" />
      </template>
    </div>
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
