import { ProcessStepsTypeEnum, ProcessStatusTypeEnum, type IProcess, type DIProcess, ProcessAttorneyTypeEnum } from '@/models/process'
import http from "@/service/http.service";

export const fetchProcesses = async (): Promise<IProcess[]> => {
  const response = await http.get(`/processes`);
  const sortedProcesses = response.data.sort((a: IProcess, b: IProcess) => {
    const order = [ProcessStatusTypeEnum.Danger, ProcessStatusTypeEnum.Warning, ProcessStatusTypeEnum.Ok, ProcessStatusTypeEnum.Delivered];
    return order.indexOf(a.status) - order.indexOf(b.status);
  })
  return sortedProcesses;
};

export const fetchAnalytics = async () => {
  const response = await http.get('/processes/overview');
  return response.data;
}

export const createProcess = async (process: DIProcess): Promise<IProcess> => {
  return await http.post(`/processes/create`, process);
};

export const getProcess = async (id: string): Promise<IProcess> => {
  const response = await http.get(`/processes/${id}`)
  return response.data
}

export const updateProcess = async (process: DIProcess): Promise<IProcess> => {
  const result = await http.put(`/processes/${process._id}`, process);
  return result.data
};

export const deleteProcessById = async (processId: String): Promise<void> => {
  await http.delete(`/processes/${processId}`);
};

export function getStepText(step: ProcessStepsTypeEnum) {
  const stepMap = {
    [ProcessStepsTypeEnum.Delegacia]: 'Delegacia(Inquérito Policial)',
    [ProcessStepsTypeEnum.AtosSecretariaI]: 'Atos da Secretaria I',
    [ProcessStepsTypeEnum.MinisterioPublico]: 'Ministério Público',
    [ProcessStepsTypeEnum.AtosSecretariaII]: 'Atos da Secretaria II',
    [ProcessStepsTypeEnum.RecebimentoDenuncia]: 'Recebimento da Denúncia',
    [ProcessStepsTypeEnum.Citacao]: 'Citação',
    [ProcessStepsTypeEnum.AtosSecretariaIII]: 'Atos da Secretaria III',
    [ProcessStepsTypeEnum.ApresentacaoDefesa]: 'Defesa',
    [ProcessStepsTypeEnum.AtosSecretariaIV]: 'Atos da Secretaria IV',
    [ProcessStepsTypeEnum.ImpugnacaoMP]: 'Impugnação MP',
    [ProcessStepsTypeEnum.AtosSecretariaV]: 'Atos da Secretaria V',
    [ProcessStepsTypeEnum.AudienciaInqueritoJudicial]: 'Instrução',
    [ProcessStepsTypeEnum.AtosSecretariaVI]: 'Atos da Secretaria VI',
    [ProcessStepsTypeEnum.MemoriaisMinisterioPublico]: 'Memoriais Ministério Público',
    [ProcessStepsTypeEnum.AtosSecretariaVII]: 'Atos da Secretaria VII',
    [ProcessStepsTypeEnum.MemoriaisDefesa]: 'Memoriais Defesa',
    [ProcessStepsTypeEnum.AtosSecretariaVIII]: 'Atos da Secretaria VIII',
    [ProcessStepsTypeEnum.Sentenca]: 'Sentença',
    [ProcessStepsTypeEnum.Finalizado]: 'Sentenciado',
  }
  return stepMap[step]
}

export function getAttorneyTypeText(attorneyType: string) {
  if (attorneyType === ProcessAttorneyTypeEnum.Private) return 'Advogado Constituído'
  if (attorneyType === ProcessAttorneyTypeEnum.Public) return 'Defensoria Pública'
}

export function getStatusText(status: ProcessStatusTypeEnum) {
  const statusMap = {
    [ProcessStatusTypeEnum.Ok]: 'Ok',
    [ProcessStatusTypeEnum.Warning]: 'Atenção',
    [ProcessStatusTypeEnum.Danger]: 'Perigo',
    [ProcessStatusTypeEnum.Hold]: 'Parado',
    [ProcessStatusTypeEnum.Delivered]: 'Concluido',
  }
  return statusMap[status]
}

export function getColorForProcessStatus(status: ProcessStatusTypeEnum, includeTag = true): string {
  const colorMap = {
    [ProcessStatusTypeEnum.Ok]: "bg-green-500 text-white",
    [ProcessStatusTypeEnum.Warning]: "bg-yellow-300 text-yellow-800",
    [ProcessStatusTypeEnum.Danger]: "bg-red-600 text-red-100",
    [ProcessStatusTypeEnum.Delivered]: "bg-gray-400 text-gray-50",
    [ProcessStatusTypeEnum.Hold]: "bg-blue-100 text-blue-700",
  };

  const classes = colorMap[status] || "bg-green-500 text-green-100";

  return includeTag ? `tag ${classes}` : classes;
}

export const getThresholdsMessage = (lastStep: ProcessStepsTypeEnum, isPrivateAtorney: boolean) => {
  const thresholds: any = {
    [ProcessStepsTypeEnum.Delegacia]: [10, 15],
    [ProcessStepsTypeEnum.AtosSecretariaI]: [1, 3],
    [ProcessStepsTypeEnum.MinisterioPublico]: [5, 7],
    [ProcessStepsTypeEnum.AtosSecretariaII]: [1, 3],
    [ProcessStepsTypeEnum.RecebimentoDenuncia]: [1, 2],
    [ProcessStepsTypeEnum.Citacao]: [5, 7],
    [ProcessStepsTypeEnum.AtosSecretariaIII]: [1, 3],
    [ProcessStepsTypeEnum.ApresentacaoDefesa]: isPrivateAtorney
      ? [10, 15]
      : [20, 30],
    [ProcessStepsTypeEnum.AtosSecretariaIV]: [1, 3],
    [ProcessStepsTypeEnum.ImpugnacaoMP]: [5, 7],
    [ProcessStepsTypeEnum.AtosSecretariaV]: [1, 3],
    [ProcessStepsTypeEnum.AudienciaInqueritoJudicial]: [30, 45],
    [ProcessStepsTypeEnum.AtosSecretariaVI]: [1, 3],
    [ProcessStepsTypeEnum.MemoriaisDefesa]: isPrivateAtorney
      ? [5, 7]
      : [10, 15],
    [ProcessStepsTypeEnum.AtosSecretariaVII]: [1, 3],
    [ProcessStepsTypeEnum.MemoriaisMinisterioPublico]: [5, 7],
    [ProcessStepsTypeEnum.AtosSecretariaVIII]: [1, 3],
    [ProcessStepsTypeEnum.Sentenca]: [10, 15],
  };

  if (!thresholds[lastStep]) {
    return "Thresholds não definidos para este passo.";
  }

  const [okThreshold, warningThreshold] = thresholds[lastStep];

  const message = `Prazo Legal: ${okThreshold} ${okThreshold !== 1 ? 'dias' : 'dia'}`;
  return message;
};

export const formatDate = (dateString: string) => {
  if (!dateString) return '';

  const datePart = dateString.split('T')[0];

  const [year, month, day] = datePart.split('-');

  return `${day}/${month}/${year}`;
}


export const getHistoryCardProps = (item: any, i: number, process: IProcess) => ({
  step: item.step,
  startDate: item.startDate,
  finalDate: item.finalDate,
  isPrivateAttorney: item.attorneyType === ProcessAttorneyTypeEnum.Private,
  phaseCounter: i === process.stepsHistory.length - 1 ? process.daysSinceStepUpdate : item.phaseDaysCounter,
  lastStatus: i === process.stepsHistory.length - 1 ? process.status : item.lastStatus,
  statusColor: i === process.stepsHistory.length - 1 ? getColorForProcessStatus(process.status, false) : getColorForProcessStatus(item.lastStatus, false),
})
