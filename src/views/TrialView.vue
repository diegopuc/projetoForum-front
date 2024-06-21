<script setup lang="ts">
import { useVisibleStore } from '@/stores/visible';
import ProcessPresentation from '@/components/ProcessPresentation.vue';
import { getProcess } from '../service/process.service'
import { ref, onMounted, unref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const process = ref()
const id = ref()

const getIdFromRoute = () => {
  id.value = route.query.id
}

onMounted(async () => {
  getIdFromRoute()
  process.value = await getProcess(`${unref(id)}`)
})

const visibleStore = useVisibleStore();
visibleStore.toggleVisibilityOff();
</script>

<template>
  <div class="lg:min-h-screen container mx-auto pt-5">
    <ProcessPresentation v-if="process" :process="process" />
  </div>
</template>
