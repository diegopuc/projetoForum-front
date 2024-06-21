<script setup lang="ts">
import { ProcessStepsTypeEnum } from '@/models/process';
import { getStepText, getThresholdsMessage, formatDate } from '@/service/process.service';
const props = defineProps<{
  step: ProcessStepsTypeEnum,
  startDate: string,
  finalDate?: string,
  isPrivateAttorney?: boolean,
  phaseCounter?: number,
  lastStatus: string,
  statusColor: string,
}>()
</script>
<template>
  <div class="flex md:contents" v-if="props.step">
    <div class="col-start-1 col-end-3 mr-10 relative">
      <div class="h-full w-6 flex items-center justify-center">
        <div class="h-full w-2 pointer-events-none" :class="props.statusColor"></div>
      </div>
      <div class="w-6 h-6 absolute top-1/2 -mt-3 rounded-full shadow text-center" :class="props.statusColor">
        <!-- <i class="fas fa-check-circle text-white"></i> -->
      </div>
    </div>
    <div class="col-start-3 col-end-12 p-4 rounded-xl my-4 mr-auto shadow-md w-full" :class="props.statusColor">
      <h3 class="font-semibold text-xl mb-3"> {{ getStepText(props.step) }} </h3>
      <div class="text-md text-justify w-full">
        {{ getThresholdsMessage(props.step, props.isPrivateAttorney) }}
      </div>
      <div class="text-md text-justify w-full" v-if="props.phaseCounter">
        Tempo da Fase(dias): {{ props.phaseCounter }}
      </div>
      <div v-if="props.step !== ProcessStepsTypeEnum.Finalizado" class="text-md text-justify w-full">
        Início: {{ formatDate(props.startDate) }}
      </div>
      <div class="text-md text-justify w-full" v-if="props.finalDate">
        Fim: {{ formatDate(props.finalDate) }}
      </div>
    </div>
  </div>
</template>
