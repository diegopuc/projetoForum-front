import type { IProcess, IProcessAnalytics } from "@/models/process";
import { fetchProcesses, fetchAnalytics } from "@/service/process.service";
import { ref, computed } from "vue";

export function useProcess() {
  const processes = ref<IProcess[]>([]);
  const processesAnalytics = ref()

  const rawProcesses = computed(() => processes.value);

  async function listProcesses() {
    processes.value = await fetchProcesses();
  }

  async function fetchCommonRitualAnalytics() {
    processesAnalytics.value = await fetchAnalytics();
  }

  return {
    listProcesses,
    fetchCommonRitualAnalytics,
    processes,
    processesAnalytics,
    rawProcesses,
  }
}