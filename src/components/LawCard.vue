<template>
  <div class="relative block overflow-hidden rounded-md border bg-gray-50 border-gray-200 p-4 sm:p-6 lg:p-8">
    <span class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

    <div class="sm:flex inline-flex items-center sm:justify-between sm:gap-4">
      <div>
        <h3 class="text-lg font-bold text-gray-900 sm:text-2xl">
          Rito Comum
        </h3>

        <!-- <p class="mt-1 text-xs font-medium text-gray-600">By John Doe</p> -->
      </div>

      <div class="mr-0.5 sm:shrink-0">
        <RouterLink to="/dashboard"
          class="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-2 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500">
          <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>

          <span class="text-sm font-medium transition-all group-hover:mr-4">
            Details
          </span>
        </RouterLink>
      </div>
    </div>

    <div>

      <OverviewCard :title="totalCard.title" :processCounter="totalCard.processCounter" />
      <OverviewCard :title="dangerCard.title" :percentage="dangerCard.percentage"
        :processCounter="dangerCard.processCounter" :color="dangerCard.color" :direction="dangerCard.d" />
      <OverviewCard :title="warningCard.title" :percentage="warningCard.percentage"
        :processCounter="warningCard.processCounter" :color="warningCard.color" :direction="warningCard.d" />
      <OverviewCard :title="okCard.title" :percentage="okCard.percentage" :processCounter="okCard.processCounter"
        :color="okCard.color" :direction="okCard.d" />
      <OverviewCard v-if="!onHoldCard.processCounter" :title="onHoldCard.title"
        :processCounter="onHoldCard.processCounter" />
      <OverviewCard v-if="!deliveredCard.processCounter" :title="deliveredCard.title"
        :processCounter="deliveredCard.processCounter" />
    </div>

    <dl class="mt-6 flex gap-4 sm:gap-6">
      <div class="flex flex-col-reverse">
        <dt class="text-sm font-medium text-gray-600">Published</dt>
        <dd class="text-xs text-gray-500">31st June, 2022</dd>
      </div>

      <div class="flex flex-col-reverse">
        <dt class="text-sm font-medium text-gray-600">Last update</dt>
        <dd class="text-xs text-gray-500">6th April, 2023</dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import OverviewCard from './OverviewCard.vue';
import { useProcess } from '@/composables/useProcess';
import type { IProcessAnalytics } from '@/models/process';

const { processesAnalytics, fetchCommonRitualAnalytics } = useProcess();

onMounted(async () => {
  await fetchCommonRitualAnalytics();
});

// SVG paths
const up = "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6";
const down = "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6";

// Calculate percentage utility function
const calculatePercentage = (value: number, total: number) => {
  return Math.round((value / total) * 100);
};

const percentageOk = computed(() => {
  return calculatePercentage(processesAnalytics.value?.ok ?? 0, processesAnalytics.value?.total ?? 1);
});

const percentageWarning = computed(() => {
  return calculatePercentage(processesAnalytics.value?.warning ?? 0, processesAnalytics.value?.total ?? 1);
});

const percentageDanger = computed(() => {
  return calculatePercentage(processesAnalytics.value?.danger ?? 0, processesAnalytics.value?.total ?? 1);
});

const getPercentageColor = (percentage: number, threshold: number, type?: any) => {
  if (type === 'ok') return percentage < threshold ? "text-green-600" : "text-red-600";
  return percentage > threshold ? "text-green-600" : "text-red-600";
};

const getPercentageDirection = (percentage: number, threshold: number, type?: any) => {
  if (type === 'ok') return percentage > threshold ? down : up
  return percentage < threshold ? up : down
};

const dangerCard = {
  title: "Perigo",
  processCounter: computed(() => processesAnalytics.value?.danger ?? 0),
  percentage: percentageDanger,
  color: getPercentageColor(percentageDanger.value, 10),
  d: getPercentageDirection(percentageDanger.value, 10),
};

const warningCard = {
  title: "Sob aviso",
  processCounter: computed(() => processesAnalytics.value?.warning ?? 0),
  percentage: percentageWarning,
  color: getPercentageColor(percentageWarning.value, 40),
  d: getPercentageDirection(percentageWarning.value, 40),
};

const okCard = {
  title: "Ok",
  processCounter: computed(() => processesAnalytics.value?.ok ?? 0),
  percentage: percentageOk,
  color: getPercentageColor(percentageOk.value, 55, 'ok'),
  d: getPercentageDirection(percentageOk.value, 55, 'ok'),
};

// console.log(okCard)

const totalCard = {
  title: "Total",
  processCounter: computed(() => processesAnalytics.value?.total ?? 0),
};

const onHoldCard = {
  title: "Parados",
  processCounter: computed(() => processesAnalytics.value?.hold ?? 0),
};

const deliveredCard = {
  title: "Finalizados",
  processCounter: computed(() => processesAnalytics.value?.delivered ?? 0),
};
</script>
