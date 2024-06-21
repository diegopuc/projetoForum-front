<template>
    <div class="container mx-auto mt-4">
        <SupportCard />
</div>
    
</template>

<script setup lang="ts">
import SupportCard from '@/components/SupportCard.vue';
import { useVisibleStore } from '@/stores/visible';

const visibleStore = useVisibleStore();
visibleStore.toggleVisibilityOn();
    
</script>

<style scoped>

</style>