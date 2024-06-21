<template>
  <div class="container flex space-x-3">
    <ProcessGroup title="Delegacia" :processes="processStore.getCommonProcesses(ProcessStepsTypeEnum.Delegacia)"
      @process-clicked="handleProcessClicked" />
    <ProcessGroup title="MP" :processes="processStore.getCommonProcesses(ProcessStepsTypeEnum.MinisterioPublico)"
      @process-clicked="handleProcessClicked" />
    <ProcessGroup title="Defesa" :processes="processStore.getCommonProcesses(ProcessStepsTypeEnum.ApresentacaoDefesa)"
      @process-clicked="handleProcessClicked" />
    <ProcessGroup title="Instrução"
      :processes="processStore.getCommonProcesses(ProcessStepsTypeEnum.AudienciaInqueritoJudicial)"
      @process-clicked="handleProcessClicked" />
    <ProcessGroup title="Sentença" :processes="processStore.getCommonProcesses(ProcessStepsTypeEnum.Sentenca)"
      @process-clicked="handleProcessClicked" />
  </div>

  <BaseModal v-if="viewIsOpen">
    <ViewProcessModel v-if="doc && viewIsOpen" :process="doc" />
  </BaseModal>
</template>
  
<script setup lang="ts">
import { ProcessStatusTypeEnum, ProcessStepsTypeEnum, type IProcess } from '@/models/process';
import ProcessGroup from '@/components/ProcessGroup.vue';
import { useProcessStore } from '@/stores/process';
import { onMounted, ref, watchEffect } from 'vue';
import BaseModal from './modals/BaseModal.vue';
import ViewProcessModel from './modals/ViewProcessModel.vue';
import { openViewModal, viewIsOpen } from '@/composables/useModal';
import { fetchProcesses } from '@/service/process.service';

const processStore = useProcessStore();

const doc = ref<IProcess>()

const handleProcessClicked = (process: IProcess) => {
  watchEffect(() => {
    doc.value = process;
  });
  openViewModal();
};

</script>
  
<style scoped></style>
