<template>
    <div class="container mx-auto mt-4">
        <LawHeader />
        <ProcessDashboard v-if="toggle" />
        <ProcessList v-else-if="!toggle" />
    </div>
</template>
  
<script setup lang="ts">
import { useVisibleStore } from '@/stores/visible';
import LawHeader from '@/components/LawHeader.vue';
import ProcessDashboard from '@/components/ProcessDashboard.vue';
import ProcessList from '@/components/ProcessList.vue';
import { ref, computed, onMounted, watchEffect } from 'vue';
import { useProcessStore } from '@/stores/process'
import { fetchProcesses } from '@/service/process.service';
const processStore = useProcessStore()

onMounted(async () => {
    await processStore.fetchCommonProcess()
})

const visibleStore = useVisibleStore();
visibleStore.toggleVisibilityOn();

const toggle = computed(() => visibleStore.getSwitch);
</script>
  
<style scoped></style>