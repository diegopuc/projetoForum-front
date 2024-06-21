<template>
    <header>
        <div>
            <div class="lg:flex inline-flex items-center lg:justify-between lg:gap-4 mt-3 py-4">
                <div>
                    <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
                        Rito Comum
                    </h2>


                    <!-- <p class="mt-1 text-xs font-medium text-gray-600">By John Doe</p> -->
                </div>

                <div class="sm:shrink-0">
                    <!-- <button
                        class="group mr-2 relative cursor-pointer inline-flex items-center overflow-hidden rounded-sm border border-current px-8 py-1.5 text-black focus:outline-none">
                        <span class="absolute left-0 -translate-x-full transition-transform group-hover:translate-x-4">
                            <span class="material-symbols-outlined text-sm">
                                filter_list
                            </span>
                        </span>
    
                        <span class="text-sm font-medium transition-all group-hover:ml-4">
                            Filters
                        </span>
                    </button> -->

                    <button @click="toggle()"
                        class="group mr-2 relative cursor-pointer inline-flex items-center overflow-hidden rounded-sm border border-current px-8 py-1.5 text-black focus:outline-none">

                        <span class="text-sm font-medium">
                            Trocar visualização
                        </span>
                    </button>

                    <button @click="openCreateModal()"
                        class="group relative cursor-pointer inline-flex items-center overflow-hidden rounded-sm border border-current px-8 py-1.5 text-black focus:outline-none">
                        <span class="absolute right-0 translate-x-full transition-transform group-hover:-translate-x-4">
                            <span class="material-symbols-outlined text-sm mt-1">
                                add_circle
                            </span>
                        </span>

                        <span class="text-sm font-medium transition-all group-hover:mr-3">
                            Novo Processo
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <BaseModal v-if="createIsOpen && !editIsOpen && !viewIsOpen">
            <CreateProcessModal v-if="createIsOpen" />
        </BaseModal>
    </header>
</template>

<script setup lang="ts">
import { useVisibleStore } from '@/stores/visible';
import BaseModal from './modals/BaseModal.vue';
import CreateProcessModal from './modals/CreateProcessModal.vue';
import { createIsOpen, editIsOpen, openCreateModal, viewIsOpen } from '@/composables/useModal';

const visibleStore = useVisibleStore();
function toggle() {
    visibleStore.toggle();
}
</script>

<style scoped></style>