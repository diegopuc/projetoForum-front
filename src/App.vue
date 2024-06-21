<script setup lang="ts">
import { computed } from 'vue';
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { useVisibleStore } from './stores/visible';

const visibleStore = useVisibleStore();

const isVisible = computed(() => visibleStore.isVisible);

</script>

<template>
  <div class="bg-gray-100 min-h-screen">
    <Navbar v-if="isVisible"/>

    <RouterView />
  </div>
</template>

<style scoped>
</style>
