import { ProcessStepsTypeEnum, type IProcess, type DIProcess } from "@/models/process";
import { createProcess, fetchProcesses, updateProcess } from "@/service/process.service";
import { defineStore } from "pinia";
import { ref } from "vue"

export const useProcessStore = defineStore('process', () => {
  const commonProcesses = ref<IProcess[]>([])
  const getCommonProcesses = (steps: ProcessStepsTypeEnum) => {
    switch (steps) {
      case ProcessStepsTypeEnum.Delegacia:
        return commonProcesses.value.filter((item: IProcess) => item.stepsHistory[item.stepsHistory.length - 1].step === ProcessStepsTypeEnum.Delegacia)
      case ProcessStepsTypeEnum.MinisterioPublico:
        return commonProcesses.value.filter((item: IProcess) => item.stepsHistory[item.stepsHistory.length - 1].step === ProcessStepsTypeEnum.MinisterioPublico)
      case ProcessStepsTypeEnum.ApresentacaoDefesa:
        return commonProcesses.value.filter((item: IProcess) => item.stepsHistory[item.stepsHistory.length - 1].step === ProcessStepsTypeEnum.ApresentacaoDefesa)
      case ProcessStepsTypeEnum.AudienciaInqueritoJudicial:
        return commonProcesses.value.filter((item: IProcess) => item.stepsHistory[item.stepsHistory.length - 1].step === ProcessStepsTypeEnum.AudienciaInqueritoJudicial)
      case ProcessStepsTypeEnum.Sentenca:
        return commonProcesses.value.filter((item: IProcess) => item.stepsHistory[item.stepsHistory.length - 1].step === ProcessStepsTypeEnum.Sentenca)
      default:
        return commonProcesses.value.filter((item: IProcess) => item.stepsHistory[item.stepsHistory.length - 1].step === ProcessStepsTypeEnum.Finalizado)
    }
  }
  const fetchCommonProcess = async () => {
    commonProcesses.value = await fetchProcesses()
  }
  const createCommonProcess = async (process: DIProcess) => {
    const newProcess = await createProcess(process)
    commonProcesses.value.push(newProcess)
  }
  const updateCommonProcess = async (process: DIProcess) => {
    const updatedProcess = await updateProcess(process)
    const index = commonProcesses.value.findIndex((item: IProcess) => item._id === updatedProcess._id);
    if (index !== -1) {
      commonProcesses.value[index] = updatedProcess
    }
  }
  return { commonProcesses, getCommonProcesses, createCommonProcess, updateCommonProcess, fetchCommonProcess }
})
