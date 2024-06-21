<template>
    <DialogTitle as="h1" class="text-2xl font-medium leading-6 text-gray-700">
        Deletar: {{ process.processNumber }}
    </DialogTitle>
    <div class="mt-2">
        <p class="text-sm text-gray-500">Tem certeza que deseja realizar essa ação? Toda a informação será
            permanentemente removida e essa ação não pode ser desfeita.</p>
    </div>
    <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="button"
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            @click="deleteProcess(process._id!)">Deletar</button>
        <button type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            @click="closeModal()" ref="cancelButtonRef">Cancelar</button>
    </div>
</template>

<script setup lang="ts">
import type { IProcess } from '@/models/process';
import { closeModal } from '@/composables/useModal';
import { getStatusText } from '@/service/process.service';
import { DialogTitle } from '@headlessui/vue'
import { computed } from '@vue/reactivity';
import { useProcessStore } from '@/stores/process';
import { deleteProcessById } from '@/service/process.service';

const props = defineProps<{
    process: IProcess
}>()

const process = computed(() => props.process);

const processStore = useProcessStore();

async function deleteProcess(processId: string) {
    try {
        await deleteProcessById(processId)
        processStore.fetchCommonProcess()
        closeModal();
    } catch (e: any) {
        throw console.error("couldnt delete this process");
    }
}




</script>

<style scoped></style>
