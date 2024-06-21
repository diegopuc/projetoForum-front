<template>
  <div class="lg:pb-5 z-0">
    <div class="overflow-x-auto rounded-lg border bg-gray-50 border-gray-200">
      <table class="w-full divide-y-2 divide-gray-200 text-md">
        <thead>
          <tr>
            <th class="whitespace-nowrap pl-4 py-2 text-left font-medium text-gray-900">
              Ações
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Número do Processo
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Tempo Encarcerado
            </th>
            <th class="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
              Tempo da Fase
            </th>
            <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">
              Nome do réu
            </th>
            <th class="whitespace-nowrap pr-4 py-2 text-left font-medium text-gray-900">
              Fase
            </th>
            <th class="whitespace-nowrap py-2 text-left font-medium text-gray-900">
              Status
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200">
          <tr v-for="(process, index) in processStore.commonProcesses" :key="process._id">
            <td class="pl-4 py-2">
              <Menu as="div" class="relative mt-1">
                <div>
                  <MenuButton
                    class="inline-flex justify-center rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                    <span class="material-symbols-outlined">
                      more_horiz
                    </span>
                  </MenuButton>
                </div>

                <transition enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0">
                  <MenuItems
                    class="absolute left-full mt-[calc(-2.2em-2px)] mr-1 divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div class="px-1 py-1">
                      <MenuItem v-slot="{ active }">
                      <button :class="[
                        active ? 'bg-violet-500 text-white w-full' : 'text-gray-900',
                        'group flex items-center rounded-md w-full px-2 py-2 text-sm',
                      ]" @click="editModal(process)">
                        Editar
                      </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                      <button :class="[
                        active ? 'bg-violet-500 text-white w-full' : 'text-gray-900',
                        'group flex items-center rounded-md px-2 w-full py-2 text-sm',
                      ]" @click="viewModal(process)">
                        Visualizar
                      </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                      <button @click="deleteModel(process)" :class="[
                        active ? 'bg-violet-500 text-white w-full' : 'text-gray-900',
                        'group flex items-center rounded-md px-2 w-full py-2 text-sm',
                      ]">
                        Deletar
                      </button>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </transition>
              </Menu>
            </td>
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">
              {{ process.processNumber }}
            </td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ process.incarcerationDaysCount }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ process.daysSinceStepUpdate || '---' }}</td>
            <td class="whitespace-nowrap py-2 text-gray-700">{{ process.defendantName }}</td>
            <td class="whitespace-nowrap pr-4 py-2 text-gray-700">{{
              getStepText(process.stepsHistory?.[process.stepsHistory.length - 1].step) }}</td>
            <td :class="[baseClass, controlColors[index]]">{{ getStatusText(process.status) }}</td>

          </tr>
        </tbody>
      </table>
    </div>
    <BaseModal v-if="viewIsOpen || editIsOpen || deleteIsOpen">
      <EditProcessModal v-if="processAsParam && editIsOpen" :process="processAsParam" />
      <ViewProcessModel v-if="processAsParam && viewIsOpen" :process="processAsParam" />
      <DeleteModal v-if="processAsParam && deleteIsOpen" :process="processAsParam" />
    </BaseModal>
  </div>
</template>

<script setup lang="ts">
import { useProcessStore } from '@/stores/process';
import { getStepText, getStatusText, getColorForProcessStatus } from '@/service/process.service';
import { ref, watchEffect } from 'vue';
import { openViewModal, openEditModal, editIsOpen, viewIsOpen, openDeleteModal, deleteIsOpen } from '@/composables/useModal';
import EditProcessModal from './modals/EditProcessModal.vue';
import BaseModal from './modals/BaseModal.vue';
import ViewProcessModel from './modals/ViewProcessModel.vue';
import DeleteModal from './modals/DeleteModal.vue';
import type { IProcess } from '@/models/process';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const processStore = useProcessStore();
const controlColors = ref<string[]>([]);
const processAsParam = ref();
const baseClass = "mt-3.5";

watchEffect(() => {
  controlColors.value = processStore.commonProcesses.map((process: IProcess) => getColorForProcessStatus(process.status))
});

function editModal(process: IProcess) {
  watchEffect(() => {
    processAsParam.value = process;
  });
  openEditModal();
}

function viewModal(process: IProcess) {
  watchEffect(() => {
    processAsParam.value = process;
  });
  openViewModal();
}

function deleteModel(process: IProcess) {
  watchEffect(() => {
    processAsParam.value = process
  })
  openDeleteModal();
}
</script>

<style scoped></style>
