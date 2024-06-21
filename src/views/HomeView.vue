<template>
  <div class="container mx-auto mt-4">
    <LawCard />
  </div>
</template>

<script setup lang="ts">
import LawCard from '@/components/LawCard.vue';
import { useVisibleStore } from '@/stores/visible';

const visibleStore = useVisibleStore();
visibleStore.toggleVisibilityOn();
</script>