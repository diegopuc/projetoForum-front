<template>
    <div class="rounded-lg border border-gray-100 bg-white p-6 mt-4 hover:shadow-md transition-shadow duration-300">
        <div>
            <p class="text-sm text-gray-500">{{ title }}</p>

            <p class="text-2xl font-medium text-gray-900">{{ processCounter }}</p>
        </div>

        <div v-if="percentage != 0 && percentage" :class="[baseClass, color]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    :d="direction" />
            </svg>

            <p class="flex gap-2 text-xs">
                <span class="font-medium"> {{ percentage+"%" }} </span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Ref } from 'vue';

const props = defineProps<{
    title: string,
    processCounter: Ref<number>,
    percentage?: Ref<number>,
    color?: string,
    direction?: string,
}>();

const { title, processCounter, percentage, color, direction } = props;

const baseClass = "mt-1 flex gap-1"


</script>

<style scoped>

</style>