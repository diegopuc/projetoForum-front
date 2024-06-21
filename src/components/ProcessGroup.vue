<template>
  <div
    class="flex-col max-h-fit h-4/5 overflow-hidden bg-gray-50 w-[43.2ch] relative block rounded-sm border border-b-gray-200 p-4 sm:p-6 lg:px-8 lg:py-7"
    :style="{
      maxHeight: '80vh',
      height: processes.length >= 5 ? 'auto' : 'fit',
      paddingBottom: processes.length <= 5 ? '0rem' : '2rem',
    }">
    <div class="sm:flex sm:gap-4">
      <div>
        <h3 class="text-md font-semibold text-gray-500 sm:text-md">
          {{ title }}
        </h3>
      </div>
    </div>

    <div class="mt-4 max-h-full pb-10 overflow-auto">
      <div class="" v-for="(process, index) in processes" :key="index">
        <div class="mt-2 max-w-[35ch] cursor-pointer" @click="$emit('process-clicked', process)">
          <div
            class="relative block bg-white overflow-hidden rounded-md border border-gray-100 p-4 sm:p-6 lg:p-8 hover:shadow-md transition-all duration-200">
            <span :class="[baseClass, termColors[index]]"></span>

            <div class="sm:flex sm:gap-4">
              <div>
                <h3 class="text-sm font-semibold text-black-900 sm:text-sm">
                  {{ process.processNumber }}
                </h3>

                <div class="mt-2 flex gap-4 sm:gap-6">
                  <div v-if="process.daysSinceStepUpdate > 1">
                    <p class="text-sm font-medium text-gray-600">
                      Dias: {{ process.daysSinceStepUpdate }}
                    </p>
                  </div>
                  <div v-else>
                    <p class="text-sm font-medium text-gray-600">
                      Dia: {{ process.daysSinceStepUpdate }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProcessStatusTypeEnum, type IProcess } from "@/models/process";
import { ref, watchEffect, toRef } from "vue";

const props = defineProps<{
  title: string;
  processes: IProcess[]; // Remove `Ref` wrapper from `IProcess[]`
}>();

const processesRef = toRef(props, "processes"); // Create a reactive reference to props.processes

const termColors = ref<Array<"bg-green-300" | "bg-yellow-500" | "bg-red-600">>([])

function defineColorByStatus(status: ProcessStatusTypeEnum): any {
  switch (status) {
    case ProcessStatusTypeEnum.Ok:
      return "bg-green-300"
    case ProcessStatusTypeEnum.Warning:
      return "bg-yellow-500"
    case ProcessStatusTypeEnum.Danger:
      return "bg-red-600"
  }
}

watchEffect(() => {
  termColors.value = processesRef.value.map((process: IProcess) =>
    defineColorByStatus(process.status)
  );
});

const baseClass = "absolute inset-x-0 top-0 h-2 bg-gradient-to-t"
</script>

<style scoped></style>
